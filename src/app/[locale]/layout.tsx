'use client';

import { use } from 'react';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ProfileProvider } from '@/hooks/useProfile';
import { LocaleProvider } from '@/hooks/useLocale';
import { validateLocale } from './layout.server';
import { Locale } from '@/locales';
import Navbar from '@/components/Navbar';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!validateLocale(locale)) {
    return null;
  }

  return (
    <html lang={locale} className="h-full">
      <body className={`${inter.className} h-full`}>
        <LocaleProvider initialLocale={locale as Locale}>
          <AuthProvider>
            <ProfileProvider>
              <div className="flex h-full flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
            </ProfileProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
