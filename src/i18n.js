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
import aboutEn from "./translation/en/about.json";
import aboutAr from "./translation/ar/about.json";
import aboutku from "./translation/kr/about.json";

let resources = {
  en: {
    navbar: { ...navbarEn },
    index: { ...indexEn },
    auth: { ...authEn },
    about: { ...aboutEn },
  },
  ar: {
    navbar: { ...navbarAr },
    index: { ...indexAr },
    auth: { ...authAr },
    about: { ...aboutAr },
  },
  kr: {
    navbar: { ...navbarKu },
    index: { ...indexKu },
    auth: { ...authKu },
    about: { ...aboutku },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    debug: true,
    ns: ["navbar", "index", "auth", "about"],
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
