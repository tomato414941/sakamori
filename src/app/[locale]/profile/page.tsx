'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLocale } from '@/hooks/useLocale';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user && mounted && !loading) {
      router.push('/signin');
    }
  }, [user, router, mounted, loading]);

  if (!mounted || loading || !user) {
    return null;
  }

  return (
    <main className="flex-1 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {t('profile.title')}
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
