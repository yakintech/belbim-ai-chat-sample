import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import tr from "./tr.json";

const resources = {
    tr: { translation: tr },
    en: { translation: en },
};


i18n.use(initReactI18next).init({
  resources,
  lng: 'tr',
  fallbackLng: ['en', 'ru'],
  compatibilityJSON: 'v4',
  interpolation: { escapeValue: false },
});

export default i18n;