'use client';

import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/locales';

export default function Navbar() {
  const { t } = useLocale();
  const { user, signOut } = useAuth();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params?.locale as string || 'ja';

  const toggleLocale = () => {
    const newLocale = locale === 'ja' ? 'en' : 'ja';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link
              href={`/${locale}`}
              className="flex flex-shrink-0 items-center"
            >
              <span className="text-xl font-bold text-indigo-600">
                {t('common.appName')}
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-x-4 border-r pr-4">
              {user ? (
                <div className="flex items-center gap-x-4">
                  <span className="text-sm text-gray-500">{user.email}</span>
                  <button
                    onClick={signOut}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {t('auth.signOut')}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href={`/${locale}/signin`}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {t('auth.signIn')}
                  </Link>
                  <Link
                    href={`/${locale}/signup`}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t('auth.signUp')}
                  </Link>
                </>
              )}
            </div>
            <button
              onClick={toggleLocale}
              className="ml-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {locale === 'ja' ? 'English' : '日本語'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
