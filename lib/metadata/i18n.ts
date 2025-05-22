export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
  // Add more as needed
] as const

export const LOCALE_MAP = {
    en: 'en-US',
    ja: 'ja-JP',
}

export function getLocaleAvailability(locale: string) {
  return SUPPORTED_LOCALES.find(l => l.code === locale)
}