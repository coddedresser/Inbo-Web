import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/hooks/useAuth';
import { GoogleAuth, AppleAuth, OTPAuth, MagicLinkAuth } from '@/components/auth';
import { SEOHead } from '@/components/seo/SEOHead';

export default function LoginPage() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'password' | 'otp' | 'magic' | 'google' | 'apple'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = (router.query.redirect as string) || '/dashboard';
      router.push(redirect);
    }
  }, [isAuthenticated, router]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      const redirect = (router.query.redirect as string) || '/dashboard';
      router.push(redirect);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    const redirect = (router.query.redirect as string) || '/dashboard';
    router.push(redirect);
  };

  return (
    <>
      <SEOHead title={t('login')} description="Login to inbo2.0 platform" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('login')}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Auth Method Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { key: 'password', label: 'Password' },
              { key: 'otp', label: 'OTP' },
              { key: 'magic', label: 'Magic Link' },
              { key: 'google', label: 'Google' },
              { key: 'apple', label: 'Apple' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Auth Forms */}
          <div className="mt-6">
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('password')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={t('passwordPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Logging in...' : t('login')}
                </button>
              </form>
            )}

            {activeTab === 'otp' && (
              <OTPAuth email={email} onSuccess={handleAuthSuccess} onError={setError} />
            )}

            {activeTab === 'magic' && (
              <MagicLinkAuth onSuccess={handleAuthSuccess} onError={setError} />
            )}

            {activeTab === 'google' && (
              <GoogleAuth onSuccess={handleAuthSuccess} onError={setError} />
            )}

            {activeTab === 'apple' && (
              <AppleAuth onSuccess={handleAuthSuccess} onError={setError} />
            )}
          </div>

          <div className="text-center">
            <a href="/auth/register" className="text-sm text-blue-600 hover:text-blue-700">
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  };
}

