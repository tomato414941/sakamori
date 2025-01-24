'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/hooks/useLocale';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}
        className={`px-2 py-1 text-sm rounded ${
          locale === 'ja'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {locale === 'ja' ? 'English' : '日本語'}
      </button>
    </div>
  );
}
