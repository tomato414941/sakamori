'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignInForm } from '@/components/auth/SignInForm';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (user) {
      console.log('User detected, redirecting to dashboard:', user);
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex-1 flex flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          {t('common.appName')}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.noAccount')}{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            {t('auth.signUp')}
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <SignInForm />
        <div className="mt-6 text-center text-sm">
          <Link
            href="/reset-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {t('auth.forgotPassword')}
          </Link>
        </div>
      </div>
    </div>
  );
}
