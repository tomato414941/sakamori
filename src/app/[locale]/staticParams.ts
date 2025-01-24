import { locales } from '@/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
