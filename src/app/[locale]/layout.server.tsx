import type { Metadata } from 'next';
import { locales, Locale } from '@/locales';

export const metadata: Metadata = {
  title: "SAKAMORI - 酒類小売業者向け統合管理システム",
  description: "ライセンス管理、在庫管理、売上管理を効率化",
};

// サポートする言語を定義
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function validateLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
