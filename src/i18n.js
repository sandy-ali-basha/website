import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import navbarEn from "./translation/en/navbar.json"
import navbarAr from "./translation/ar/navbar.json";
import indexAr from "./translation/ar/index.json";
import indexEn from "./translation/en/index.json";

let resources = {
  en: {
    navbar: { ...navbarEn },
    index: { ...indexEn },
  },
  ar: {
    navbar: { ...navbarAr },
    index: { ...indexAr },
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    debug: true,
    ns: ["translation"],
    defualtNS: "trnaslation",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
