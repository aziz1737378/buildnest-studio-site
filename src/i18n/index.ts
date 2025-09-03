import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      it: { translation: translations.it },
      es: { translation: translations.es },
      fr: { translation: translations.fr }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18nextLng'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;