import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCredentials, logout as reduxLogout, setInitialized } from "../store/authSlice";
import { api } from "../lib/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      // First, try to refresh token (this will get the access token from the cookie and put it in Redux)
      // Since it's the initial load, we assume the user might have a valid refresh cookie
      const refreshResponse = await api.post("/api/auth/refresh", {});
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        dispatch(setCredentials({ accessToken: refreshData.accessToken }));
      }

      // Then fetch the user profile using the new enterprise API client
      const response = await api.get("/api/users/me");

      if (response.ok) {
        const data = await response.json();
        // Assume backend returns id, email, name, picture
        dispatch(
          setCredentials({
            accessToken: store.getState().auth.accessToken || '',
            user: {
              uid: data.id,
              email: data.email,
              displayName: data.name,
              photoURL: data.picture,
            },
            isAdmin: data.role === 'ROLE_ADMIN',
            isHR: data.role === 'ROLE_ADMIN' || data.role === 'ROLE_HR' || store.getState().auth.isHR,
          })
        );
      } else {
        dispatch(reduxLogout());
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      dispatch(reduxLogout());
    } finally {
      dispatch(setInitialized());
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
};

import { store } from "../store/store";
import { setHRMode as reduxSetHRMode } from "../store/authSlice";

export const HR_PASSKEY_DEFAULT = "xyphx-hr-2026";

export const useAuth = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);

  const login = async () => {
    window.location.reload();
  };

  const logout = async () => {
    try {
      setLocalLoading(true);
      await api.post("/api/auth/logout", {});
      dispatch(reduxLogout());
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const setHRMode = (enabled: boolean) => {
    dispatch(reduxSetHRMode(enabled));
  };

  const verifyHRAccess = (passkey: string): boolean => {
    if (passkey.trim() === HR_PASSKEY_DEFAULT || passkey.trim() === "xyphx@admin2026") {
      dispatch(reduxSetHRMode(true));
      return true;
    }
    return false;
  };

  return {
    user: authState.user,
    isAdmin: authState.isAdmin,
    isHR: authState.isHR || authState.isAdmin,
    loading: localLoading || !authState.isInitialized,
    login,
    logout,
    setHRMode,
    verifyHRAccess,
  };
};

