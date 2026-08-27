import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setCredentials,
  logout as reduxLogout,
  setInitialized,
  setHRMode as reduxSetHRMode,
} from "../store/authSlice";
import { api } from "../lib/api";
import { supabase } from "@/lib/supabase.ts"
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      // 1. Check native Supabase Auth session first
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Hydrate Redux state using Supabase user details directly
        dispatch(
          setCredentials({
            accessToken: session.access_token,
            user: {
              uid: session.user.id,
              email: session.user.email || "",
              displayName: session.user.user_metadata?.full_name || session.user.email,
              photoURL: session.user.user_metadata?.avatar_url || "",
            },
            isAdmin: session.user.app_metadata?.role === "ROLE_ADMIN",
            isHR: session.user.app_metadata?.role === "ROLE_HR",
          })
        );
      } else {
        // 2. Fallback to API endpoint if running custom backend
        // Note: api.get directly returns the parsed JSON data
        const data = await api.get("/api/users/me");

        dispatch(
          setCredentials({
            accessToken: data.accessToken || "",
            user: {
              uid: data.id,
              email: data.email,
              displayName: data.name,
              photoURL: data.picture,
            },
            isAdmin: data.role === "ROLE_ADMIN",
            isHR: data.role === "ROLE_ADMIN" || data.role === "ROLE_HR",
          })
        );
      }
    } catch (error) {
      console.warn("No active session found:", error);
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

export const HR_PASSKEY_DEFAULT = "fijopanto@007";

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
      // Sign out from Supabase Auth directly
      await supabase.auth.signOut();
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

  const verifyHRAccess = (inputPasskey: string): boolean => {
    const validPasskey = import.meta.env.VITE_HR_PASSKEY || HR_PASSKEY_DEFAULT;

    if (inputPasskey.trim() === validPasskey) {
      dispatch(reduxSetHRMode(true));
      localStorage.setItem("isHRMode", "true");
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