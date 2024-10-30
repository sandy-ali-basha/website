// i18n.js
import i18n from "i18next";
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
import aboutKu from "./translation/kr/about.json";

const resources = {
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
    about: { ...aboutKu },
  },
};

// Set initial language directly from localStorage
const savedLanguage = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(initReactI18next)
  .init({
    lng: savedLanguage, // Use saved language as initial language
    fallbackLng: false, // Disable fallback language
    resources,
    debug: true,
    ns: ["navbar", "index", "auth", "about"],
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
