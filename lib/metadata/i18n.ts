import defaultEn from '@/messages/en.json'
import { useLocale, useTranslations as useNextTranslations } from 'next-intl'

type Messages = Record<string, Record<string, string>>

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
  const t = useNextTranslations(namespace);
  const locale = useLocale();

  const text = (key: string): string => {
    try {
      const value = t(key);
      const isMissing = namespace && value === `${namespace}.${key}`;

      if (isMissing && process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] Missing translation for key "${namespace}.${key}" in locale "${locale}". Falling back to English.`
        );
      }

      return isMissing ? (defaultEn as Messages)?.[namespace]?.[key] || key : value;
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] Error accessing translation for key "${namespace}.${key}" in locale "${locale}". Falling back to English.`
        );
      }

      return (defaultEn as Messages)?.[namespace || '']?.[key] || key;
    }
  };

  const rich = (
    key: string,
    values: Record<string, (chunks: React.ReactNode) => React.ReactNode>
  ): React.ReactNode => {
    try {
      return t.rich(key, values);
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] Error accessing rich translation for key "${namespace}.${key}" in locale "${locale}". Falling back to plain text.`
        );
      }

      const fallback = (defaultEn as Messages)?.[namespace || '']?.[key] || key;
      return fallback;
    }
  };

  return { text, rich };
}