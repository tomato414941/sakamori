import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
 
// 対応している言語を定義
export const locales = ['en', 'ja'];
 
export default getRequestConfig(async ({ locale }) => {
  // サポートされていない言語の場合は404
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
