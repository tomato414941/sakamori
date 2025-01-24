'use client';

import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, defaultLocale, getTranslations, translations } from '@/locales';

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    },
    [locale, pathname, router]
  );

  const t = useCallback(
    (key: string) => {
      const keys = key.split('.');
      let current: any = translations[locale];
      for (const k of keys) {
        if (current[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        current = current[k];
      }
      return current;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
