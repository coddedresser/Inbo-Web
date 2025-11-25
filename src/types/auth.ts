export interface User {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
  is_staff?: boolean;
  created_at: string;
  last_login?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  user: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  company?: string;
  job_title?: string;
  location?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OTPRequest {
  email?: string;
  phone?: string;
}

export interface OTPVerify {
  email?: string;
  phone?: string;
  otp: string;
}

export interface MagicLinkRequest {
  email: string;
  callback_url?: string;
}

export interface GoogleAuthRequest {
  id_token: string;
  access_token?: string;
}

export interface AppleAuthRequest {
  id_token: string;
  authorization_code?: string;
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

export interface DeepLinkParams {
  token?: string;
  email?: string;
  redirect?: string;
  [key: string]: string | undefined;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

