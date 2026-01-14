// i18n配置和初始化 (i18n Configuration and Initialization)
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations.js';

// 初始化i18n (Initialize i18n)
i18next
  .use(LanguageDetector)
  .init({
    resources: translations,
    fallbackLng: 'zh-CN', // 默认语言为简体中文 (Default language: Simplified Chinese)
    lng: 'zh-CN', // 强制默认为中文 (Force default to Chinese)
    debug: false,
    interpolation: {
      escapeValue: false, // React已经安全 (React already safe)
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'crystal-bird-language',
    }
  });

export default i18next;
