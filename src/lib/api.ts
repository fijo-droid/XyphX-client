/**
 * Enterprise-grade centralized API client.
 * Automatically prepends the base URL and attaches Authorization headers.
 */

import { store } from '../store/store';
import { setCredentials, logout } from '../store/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface RequestOptions extends RequestInit {
  // Add custom options here if needed
}

// 1. Core request function separated from object wrapper
async function sendRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {},
  isRetry = false
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers);

  // Auto-attach Authorization header from Redux state if available
  const state = store.getState();
  const token = state.auth?.accessToken;
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Handle Content-Type dynamically for JSON vs FormData
  if (
    !headers.has('Content-Type') &&
    options.body &&
    !(options.body instanceof FormData) &&
    typeof options.body === 'string'
  ) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Automatically send and receive HttpOnly cookies
  };

  let response = await fetch(url, config);

  // Global interceptor logic for 401 Unauthorized
  if (response.status === 401 && !isRetry && !endpoint.includes('/api/auth/')) {
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        // Dispatch new token to Redux
        store.dispatch(setCredentials({ accessToken: data.accessToken }));

        // Clone headers and set updated Authorization token
        const retryHeaders = new Headers(headers);
        retryHeaders.set('Authorization', `Bearer ${data.accessToken}`);

        // Retry original request
        return sendRequest<T>(endpoint, { ...options, headers: retryHeaders }, true);
      } else {
        store.dispatch(logout());
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    } catch (err) {
      store.dispatch(logout());
      window.location.href = '/login';
      throw err;
    }
  }

  // Safely parse JSON or handle Non-OK status responses to prevent HTML parsing errors
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (!response.ok) {
    if (isJson) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } else {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}. Check backend server route.`
      );
    }
  }

  if (isJson) {
    return (await response.json()) as T;
  }

  return {} as T;
}

export const api = {
  request: sendRequest,

  get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return sendRequest<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T = any>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<T> {
    const isFormData = body instanceof FormData;
    return sendRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put<T = any>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<T> {
    const isFormData = body instanceof FormData;
    return sendRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return sendRequest<T>(endpoint, { ...options, method: 'DELETE' });
  },
};