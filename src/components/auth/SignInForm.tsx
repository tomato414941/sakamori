'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('');
      await signIn(email, password);
      setMessage('サインインに成功しました');
      // 成功したらダッシュボードにリダイレクト
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.code === 'auth/invalid-email') {
        setMessage('エラー: メールアドレスの形式が正しくありません');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('エラー: ユーザーが見つかりません');
      } else if (error.code === 'auth/wrong-password') {
        setMessage('エラー: パスワードが間違っています');
      } else if (error.code === 'auth/too-many-requests') {
        setMessage('エラー: ログイン試行回数が多すぎます。しばらく時間をおいてから再度お試しください');
      } else {
        setMessage(`エラー: ${error.message || '不明なエラーが発生しました'}`);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white py-8 px-10 shadow rounded-lg sm:px-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">サインイン</h2>
        <form onSubmit={handleSubmit} role="form" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'サインイン中...' : 'サインイン'}
            </button>
          </div>
        </form>

        {message && (
          <div 
            className={`mt-6 p-4 rounded-md ${
              message.includes('エラー') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
