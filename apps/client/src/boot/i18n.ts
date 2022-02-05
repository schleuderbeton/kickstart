import {boot} from 'quasar/wrappers'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'src/i18n/locales/en.json'
import axios from "axios";

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n)

export const supportedLocales = ["en", "de"];
export const defaultLocale = "en";
const defaultMessages = {"en": enLocale};


const checkBrowserLanguage = () => {
  const findLang = (lang?: any) => {
    return supportedLocales.find(locale => locale === lang);
  }
  let matched = findLang(window.localStorage.getItem("locale"));
  if (!matched) {
    matched = findLang(navigator.language);
    if (!matched) {
      matched = findLang(navigator.language.split('-')[0]);
      if (!matched) {
        const navigatorLanguagePartials = navigator.language.split('-')[0];
        matched = supportedLocales.find(lang => lang.split('-')[0] === navigatorLanguagePartials);
      }
    }
  }
  return matched;
}

const initialLocale = checkBrowserLanguage() || process.env.APP_I18N_LOCALE || defaultLocale;

export const i18n = new VueI18n({
  locale: initialLocale,
  fallbackLocale: defaultLocale,
  messages: defaultMessages,
})

const loadedLanguages = [defaultLocale];


export function changeLocale(locale:string) {
  const setLocale = (locale:string) => {
    i18n.locale = locale;
    axios.defaults.headers.common['Accept-Language'] = locale;
    // @ts-ignore
    document.querySelector('html').setAttribute('locale', locale);
    window.localStorage.setItem("locale", locale);
    return locale;
  }

  // if locale isn't supported
  if (!supportedLocales.includes(locale)) {
    return Promise.reject(`locale "${locale}" not supported`);
  }

  // If the language was already loaded
  if (loadedLanguages.includes(locale)) {
    return Promise.resolve(setLocale(locale));
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "locale-[request]" */ `src/i18n/locales/${locale}.json`).then(
    messages => {
      i18n.setLocaleMessage(locale, messages.default);
      loadedLanguages.push(locale);
      return setLocale(locale);
    }
  );
}


export default boot(async ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
  await changeLocale(initialLocale);
})
