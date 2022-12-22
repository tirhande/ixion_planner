import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEn from "./lang.en.json";
import langKo from "./lang.ko.json";

const resource = {
  en: {
    translations: langEn,
  },
  ko: {
    translations: langKo,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: "ko",
  //초기값
  fallbackLng: "ko",
  debug: false,
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;