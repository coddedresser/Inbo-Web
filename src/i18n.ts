"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translations
import common from "../public/locales/en/common.json";
import auth from "../public/locales/en/auth.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        common,
        auth,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
