import { en } from './en';
import { ja } from './ja';

export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

export const translations = {
  en,
  ja,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export type TranslationKey = keyof typeof ja;
