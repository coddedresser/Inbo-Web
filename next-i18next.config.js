module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'hi', 'zh'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['en'],
  },
  react: {
    useSuspense: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
