'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authService } from '@/services/auth';
import type {
  User,
  LoginCredentials,
  AuthState,
  OTPVerify,
  MagicLinkRequest,
  GoogleAuthRequest,
  AppleAuthRequest,
} from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  }) => Promise<void>;
  googleAuth: (data: GoogleAuthRequest) => Promise<void>;
  appleAuth: (data: AppleAuthRequest) => Promise<void>;
  requestOTP: (email?: string, phone?: string) => Promise<{ message: string; expires_in: number }>;
  verifyOTP: (data: OTPVerify) => Promise<void>;
  requestMagicLink: (email: string, callbackUrl?: string) => Promise<{ message: string }>;
  verifyMagicLink: (token: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Prevent multiple refreshUser runs on mount
  const hasTriedRestoreRef = useRef(false);

  const refreshUser = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        const user = await authService.getCurrentUser();
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error?.response?.data?.message || 'Failed to fetch user',
      });
    }
  }, []);

  useEffect(() => {
    // Ensure we only attempt restore once during client mount to avoid loops
    if (hasTriedRestoreRef.current) return;
    hasTriedRestoreRef.current = true;

    // Run restore
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await authService.login(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || 'Login failed',
      }));
      throw error;
    }
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      first_name?: string;
      last_name?: string;
      username?: string;
    }) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { user } = await authService.register(data);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error?.response?.data?.message || 'Registration failed',
        }));
        throw error;
      }
    },
    []
  );

  const googleAuth = useCallback(async (data: GoogleAuthRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await authService.googleAuth(data);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || 'Google authentication failed',
      }));
      throw error;
    }
  }, []);

  const appleAuth = useCallback(async (data: AppleAuthRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await authService.appleAuth(data);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || 'Apple authentication failed',
      }));
      throw error;
    }
  }, []);

  const requestOTP = useCallback(async (email?: string, phone?: string) => {
    try {
      return await authService.requestOTP({ email, phone });
    } catch (error: any) {
      throw error;
    }
  }, []);

  const verifyOTP = useCallback(async (data: OTPVerify) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await authService.verifyOTP(data);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || 'OTP verification failed',
      }));
      throw error;
    }
  }, []);

  const requestMagicLink = useCallback(async (email: string, callbackUrl?: string) => {
    try {
      return await authService.requestMagicLink({ email, callback_url: callbackUrl });
    } catch (error: any) {
      throw error;
    }
  }, []);

  const verifyMagicLink = useCallback(async (token: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await authService.verifyMagicLink(token);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || 'Magic link verification failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } catch (error) {
      // Even if logout fails, clear local state
      console.error('Logout error:', error);
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    googleAuth,
    appleAuth,
    requestOTP,
    verifyOTP,
    requestMagicLink,
    verifyMagicLink,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
