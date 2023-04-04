import i18n from "i18next";
import en from "locales/en.json";
import ru from "locales/ru.json";
import { initReactI18next } from "react-i18next";
import {getLang} from "./service/local-storage";

const resources = {
    ru,
    en,
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).init({
    resources,
    // defaultNS: "common",
    lng: getLang(),
    ns: [ "common" ],
    defaultNS: "common",
    fallbackLng: false,
});
