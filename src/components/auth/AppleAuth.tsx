'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface AppleAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const AppleAuth: React.FC<AppleAuthProps> = ({ onSuccess, onError }) => {
  const { appleAuth } = useAuth();
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Apple Sign In script if not already loaded
    if (!document.getElementById('apple-signin-script')) {
      const script = document.createElement('script');
      script.id = 'apple-signin-script';
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.AppleID) {
          window.AppleID.auth.init({
            clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '',
            scope: 'name email',
            redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || window.location.origin + '/auth/apple/callback',
            usePopup: true,
          });
        }
      };
    } else if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '',
        scope: 'name email',
        redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || window.location.origin + '/auth/apple/callback',
        usePopup: true,
      });
    }
  }, []);

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      if (!window.AppleID) {
        throw new Error('Apple Sign In script not loaded');
      }

      window.AppleID.auth.signIn({
        requestedScopes: ['name', 'email'],
      }).then((response: any) => {
        handleAppleResponse(response);
      }).catch((error: any) => {
        setIsLoading(false);
        onError?.(error?.message || 'Apple authentication failed');
      });
    } catch (error: any) {
      setIsLoading(false);
      onError?.(error?.message || 'Failed to load Apple authentication');
    }
  };

  const handleAppleResponse = async (response: any) => {
    try {
      await appleAuth({
        id_token: response.id_token,
        authorization_code: response.code,
        user: response.user ? {
          email: response.user.email,
          name: response.user.name ? {
            firstName: response.user.name.firstName,
            lastName: response.user.name.lastName,
          } : undefined,
        } : undefined,
      });
      onSuccess?.();
    } catch (error: any) {
      onError?.(error?.response?.data?.message || 'Apple authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAppleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
        <span>{isLoading ? 'Loading...' : t('signInWithApple')}</span>
      </button>
    </div>
  );
};

// Extend Window interface for Apple Sign In
declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: {
          clientId: string;
          scope: string;
          redirectURI: string;
          usePopup: boolean;
        }) => void;
        signIn: (config: {
          requestedScopes: string[];
        }) => Promise<{
          id_token: string;
          code: string;
          user?: {
            email?: string;
            name?: {
              firstName?: string;
              lastName?: string;
            };
          };
        }>;
      };
    };
  }
}

