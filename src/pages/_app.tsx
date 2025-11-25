import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from '@/contexts/AuthContext';
import { DefaultSEO } from '@/utils/seo';
import { useEffect } from 'react';
import DeepLinkHandler from '@/utils/deepLink';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize deep link handler
    DeepLinkHandler.getInstance();
  }, []);

  return (
    <>
      <DefaultSEO />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default appWithTranslation(App);
