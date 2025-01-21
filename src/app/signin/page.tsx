'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignInForm } from '@/components/auth/SignInForm';
import { useAuth } from '@/hooks/useAuth';

export default function SignInPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          SAKAMORIへようこそ
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          アカウントをお持ちでない場合は{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            新規登録
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignInForm />
        <div className="mt-6 text-center">
          <Link
            href="/reset-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            パスワードをお忘れの方はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
