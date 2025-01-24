'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const { user } = useAuth();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.welcome')}, {user?.email}
          </h1>
          
          {/* ダッシュボードの内容 */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* チェックリストセクション */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900">
                  {t('dashboard.checklist.title')}
                </h2>
                {/* チェックリストの内容をここに追加 */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
