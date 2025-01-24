import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import "../globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { locales, Locale } from "@/locales";
import { LocaleProvider } from "@/hooks/useLocale";

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
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout(props: Props) {
  const { locale } = await props.params;

  // サポートされていない言語の場合は404
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased h-full`}>
        <LocaleProvider initialLocale={locale as Locale}>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-gray-50">
              <LanguageSwitcher />
              {props.children}
            </div>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
