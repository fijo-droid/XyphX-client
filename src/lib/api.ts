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
async function sendRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
  isRetry = false
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});

  // Attach token from Redux
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Handle Content-Type dynamically for JSON vs FormData
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData) && typeof options.body === 'string') {
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
        credentials: 'include'
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        // Dispatch new token to Redux
        store.dispatch(setCredentials({ accessToken: data.accessToken }));

        // Clone headers and set updated Authorization token
        const retryHeaders = new Headers(headers);
        retryHeaders.set('Authorization', `Bearer ${data.accessToken}`);

        // FIX: Calls sendRequest directly without 'this' scoping issues
        return sendRequest<T>(endpoint, { ...options, headers: retryHeaders }, true);
      } else {
        store.dispatch(logout());
        window.location.href = '/login';
      }
    } catch (err) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  }

  return response;
}

export const api = {
  request: sendRequest,

  get(endpoint: string, options: RequestOptions = {}) {
    return sendRequest(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint: string, body: any, options: RequestOptions = {}) {
    const isFormData = body instanceof FormData;
    return sendRequest(endpoint, {
      ...options,
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put(endpoint: string, body: any, options: RequestOptions = {}) {
    const isFormData = body instanceof FormData;
    return sendRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete(endpoint: string, options: RequestOptions = {}) {
    return sendRequest(endpoint, { ...options, method: 'DELETE' });
  }
};