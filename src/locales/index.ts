import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './langauges/en.json';
import ar from './langauges/ar.json';
import fr from './langauges/fr.json';
import es from './langauges/es.json';
import ur from './langauges/ur.json';
import ru from './langauges/ru.json';
import zh from './langauges/zh.json';
import tl from './langauges/tl.json';
import IL_ar from '../locales/langauges/il.ar.json';
import IL_en from '../locales/langauges/il.en.json';

import {store} from '../redux/store';

export default i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: {...en, ...IL_en}},
    ar: {translation: {...ar, ...IL_ar}},
    fr: {translation: fr},
    es: {translation: es},
    ur: {translation: ur},
    ru: {translation: ru},
    zh: {translation: zh},
    tl: {translation: tl},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const isArabic = () => {
  let lang = store.getState().lang?.lang || 'ar';
  if (lang === 'ar') {
    return true;
  } else {
    return false;
  }
};
