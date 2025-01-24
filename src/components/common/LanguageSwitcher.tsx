'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // 現在のパスから言語部分を除去して新しい言語を追加
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => switchLanguage(currentLocale === 'en' ? 'ja' : 'en')}
        className={`px-2 py-1 text-sm rounded ${
          currentLocale === 'ja'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {currentLocale === 'ja' ? 'English' : '日本語'}
      </button>
    </div>
  );
}
