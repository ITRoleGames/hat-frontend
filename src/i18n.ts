import i18n from "i18next";
import en from "locales/en.json";
import ru from "locales/ru.json";
import { initReactI18next } from "react-i18next";

const resources = {
    ru,
    en,
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).init({
    resources,
    // defaultNS: "common",
    lng: "ru",
    ns: [ "common" ],
    defaultNS: "common",
    fallbackLng: false,
});
