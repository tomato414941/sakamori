'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLocale } from '@/hooks/useLocale';
import { LanguageSwitcher } from './LanguageSwitcher';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { t } = useLocale();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">{t('common.appName')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={signOut}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {t('auth.signOut')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{t('auth.notSignedIn')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
