import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import navbarEn from "./translation/en/navbar.json";
import navbarAr from "./translation/ar/navbar.json";
import navbarKu from "./translation/kr/navbar.json";
import indexAr from "./translation/ar/index.json";
import indexEn from "./translation/en/index.json";
import indexKu from "./translation/kr/index.json";
import authAr from "./translation/ar/auth.json";
import authEn from "./translation/en/auth.json";
import authKu from "./translation/kr/auth.json";

let resources = {
  en: {
    navbar: { ...navbarEn },
    index: { ...indexEn },
    auth: { ...authAr },
  },
  ar: {
    navbar: { ...navbarAr },
    index: { ...indexAr },
    auth: { ...authEn },
  },
  kr: {
    navbar: { ...navbarKu },
    index: { ...indexKu },
    auth: { ...authKu },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    debug: true,
    ns: ["navbar", "index"],
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
