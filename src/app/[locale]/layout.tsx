import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import "../globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SAKAMORI - 酒類小売業者向け統合管理システム",
  description: "ライセンス管理、在庫管理、売上管理を効率化",
};

// サポートする言語を定義
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ja' }];
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className="h-full">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased h-full`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <div className="min-h-full">
              <div className="fixed top-4 right-4 z-50">
                <LanguageSwitcher />
              </div>
              {children}
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
