import apiClient from '@/utils/api';
import Cookies from 'js-cookie';
import type {
  LoginCredentials,
  AuthResponse,
  User,
  OTPRequest,
  OTPVerify,
  MagicLinkRequest,
  GoogleAuthRequest,
  AppleAuthRequest,
  DeepLinkParams,
} from '@/types/auth';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  GOOGLE_AUTH: '/auth/google',
  APPLE_AUTH: '/auth/apple',
  OTP_REQUEST: '/auth/otp/request',
  OTP_VERIFY: '/auth/otp/verify',
  MAGIC_LINK_REQUEST: '/auth/magic-link/request',
  MAGIC_LINK_VERIFY: '/auth/magic-link/verify',
  DEEP_LINK_AUTH: '/auth/deep-link',
} as const;

class AuthService {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Register new user
   */
  async register(data: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(AUTH_ENDPOINTS.ME);
    return response.data;
  }

  /**
   * Google OAuth authentication
   */
  async googleAuth(data: GoogleAuthRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.GOOGLE_AUTH, data);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Apple OAuth authentication
   */
  async appleAuth(data: AppleAuthRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.APPLE_AUTH, data);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Request OTP
   */
  async requestOTP(data: OTPRequest): Promise<{ message: string; expires_in: number }> {
    const response = await apiClient.post(AUTH_ENDPOINTS.OTP_REQUEST, data);
    return response.data;
  }

  /**
   * Verify OTP
   */
  async verifyOTP(data: OTPVerify): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.OTP_VERIFY, data);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Request magic link
   */
  async requestMagicLink(data: MagicLinkRequest): Promise<{ message: string }> {
    const response = await apiClient.post(AUTH_ENDPOINTS.MAGIC_LINK_REQUEST, data);
    return response.data;
  }

  /**
   * Verify magic link token
   */
  async verifyMagicLink(token: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.MAGIC_LINK_VERIFY, {
      token,
    });
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Authenticate via deep link (for mobile app integration)
   */
  async deepLinkAuth(params: DeepLinkParams): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.DEEP_LINK_AUTH, params);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ access: string; refresh?: string }> {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ access: string; refresh?: string }>(
      AUTH_ENDPOINTS.REFRESH,
      { refresh: refreshToken }
    );
    this.setTokens({ access: response.data.access, refresh: response.data.refresh || refreshToken });
    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!Cookies.get('access_token');
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return Cookies.get('access_token') || null;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return Cookies.get('refresh_token') || null;
  }

  /**
   * Set authentication tokens
   */
  private setTokens(tokens: { access: string; refresh: string }): void {
    Cookies.set('access_token', tokens.access, { expires: 7, sameSite: 'strict' });
    Cookies.set('refresh_token', tokens.refresh, { expires: 30, sameSite: 'strict' });
  }

  /**
   * Clear authentication tokens
   */
  private clearTokens(): void {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  }
}

export const authService = new AuthService();
export default authService;
