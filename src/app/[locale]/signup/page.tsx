'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex-1 flex flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          SAKAMORIへようこそ
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          アカウントをお持ちの場合は{' '}
          <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            サインイン
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <SignUpForm />
      </div>
    </div>
  );
}
