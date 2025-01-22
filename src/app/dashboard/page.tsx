'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          ようこそ、{user?.email}さん
        </h1>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 統計カード */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-900">在庫アイテム数</h3>
              <p className="text-3xl font-bold text-indigo-600">0</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-green-900">今月の売上</h3>
              <p className="text-3xl font-bold text-green-600">¥0</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-900">未処理の注文</h3>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </div>
          </div>
        </div>

        {/* 最近の活動 */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">最近の活動</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-center py-4">まだ活動記録がありません</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
