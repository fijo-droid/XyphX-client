import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAdmin: boolean;
  isHR: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const getInitialHRState = (): boolean => {
  try {
    return localStorage.getItem('xyphx_hr_mode') === 'true';
  } catch {
    return false;
  }
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAdmin: false,
  isHR: getInitialHRState(),
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User; isAdmin?: boolean; isHR?: boolean }>
    ) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
      if (action.payload.isAdmin !== undefined) {
        state.isAdmin = action.payload.isAdmin;
      }
      if (action.payload.isHR !== undefined) {
        state.isHR = action.payload.isHR;
      }
      state.isAuthenticated = true;
    },
    updateUser: (
      state,
      action: PayloadAction<{ user: User; isAdmin: boolean; isHR?: boolean }>
    ) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      if (action.payload.isHR !== undefined) {
        state.isHR = action.payload.isHR;
      }
    },
    setHRMode: (state, action: PayloadAction<boolean>) => {
      state.isHR = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem('xyphx_hr_mode', 'true');
        } else {
          localStorage.removeItem('xyphx_hr_mode');
        }
      } catch (err) {
        console.error('Failed to set HR mode in localStorage', err);
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAdmin = false;
      state.isHR = false;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('xyphx_hr_mode');
      } catch {}
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    }
  },
});

export const { setCredentials, updateUser, setHRMode, logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;

