import en from '../locales/en'
import ar from '../locales/ar'

export const I18N = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  vueI18n: {
    fallbackLocale: 'ar',
    messages: {
      ar,
      en
    }
  }
}
