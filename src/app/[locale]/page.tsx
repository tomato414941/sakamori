'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    // ユーザーの状態に応じてリダイレクト
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [user, router]);

  // リダイレクト中はローディング表示
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t('common.appName')}</h1>
        <p>{t('common.loading')}</p>
      </div>
    </div>
  );
}
