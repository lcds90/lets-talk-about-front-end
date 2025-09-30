import { createI18n } from 'vue-i18n'
import messages from './i18n.json'
export const i18nInstanceConversations = createI18n({
  locale: navigator.language || 'en',
  fallbackLocale: 'en',
  messages,
})

export const i18nConversations = i18nInstanceConversations.global.t
