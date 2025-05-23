import { useTranslations as useNextTranslations, useLocale } from 'next-intl'
import defaultEn from '@/messages/en.json'

export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
  // Add more as needed
] as const

export const LOCALE_MAP = {
    en: 'en-US',
    ja: 'ja-JP',
}

export function getAllLocaleAvailability(locale: string) {
  return SUPPORTED_LOCALES.find(l => l.code === locale)
}

export function getLocaleAvailability(locale: string): string {
  return SUPPORTED_LOCALES.find(l => l.code === locale)?.code ?? 'en';
}

export function useSafeTranslations(namespace?: string) {
  const t = useNextTranslations(namespace)
    const locale = useLocale()

  return (key: string) => {
    try {
      const value = t(key)

      const isMissing = namespace && value === `${namespace}.${key}`

      if (isMissing) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `[i18n] Missing translation for key "${namespace}.${key}" in locale "${locale}". Falling back to English.`
          )
        }

        return defaultEn?.[namespace]?.[key] || key
      }

      return value
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] Error accessing translation for key "${namespace}.${key}" in locale "${locale}". Falling back to English.`
        )
      }

      return defaultEn?.[namespace || '']?.[key] || key
    }
  }
}