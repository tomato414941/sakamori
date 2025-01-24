'use client';

import { useState } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setMode('signin')}
            className={`px-4 py-2 rounded-md ${
              mode === 'signin'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            サインイン
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-2 rounded-md ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            アカウント作成
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
