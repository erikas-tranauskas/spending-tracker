import { createI18n } from 'vue-i18n';
import en from './en.json';
import lt from './lt.json';

const saved = localStorage.getItem('lang') || 'en';

const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: 'en',
  messages: {
    en,
    lt,
  },
});

export default i18n;
