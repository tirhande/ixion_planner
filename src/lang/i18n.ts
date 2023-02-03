import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import langKo_KR from './lang.ko.json';
import langEn_US from './lang.en.json';
import langFr_FR from './lang.fr.json';
import langZh_CN from './lang.zh_CN.json';

const resource = {
  ko_KR: {
    translations: langKo_KR,
  },
  en_US: {
    translations: langEn_US,
  },
  zh_CN: {
    translations: langZh_CN,
  },
  fr_FR: {
    translations: langFr_FR,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: 'ko_KR',
  fallbackLng: 'ko_KR',
  debug: false,
  defaultNS: 'translations',
  ns: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
