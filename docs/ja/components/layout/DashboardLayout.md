# ダッシュボード

## 概要

ダッシュボードは、SAKAMORIアプリケーションのメインインターフェースとして機能します。ユーザーは在庫数、売上、保留中の注文などの重要な情報を一目で確認できます。

## コンポーネント構造

### DashboardLayout

認証で保護されたレイアウトコンポーネントで、以下を提供します：

- 認証状態の検証
- 未認証ユーザーのリダイレクト
- ローディング状態の表示
- 共通ヘッダーの表示

```tsx
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ProtectedPage() {
  return (
    <DashboardLayout>
      <div>保護されたコンテンツ</div>
    </DashboardLayout>
  );
}
```

### DashboardPage

メインのダッシュボードページコンポーネントは以下を表示します：

- ユーザー情報
- 統計情報（在庫数、売上、保留中の注文）
- 最近のアクティビティ

## 認証と保護

- すべてのダッシュボードページは認証が必要
- 未認証ユーザーは自動的にサインインページにリダイレクト
- 認証チェック中は適切なローディングインジケーターを表示

## テスト

テストは以下の場所にあります：

- `src/app/dashboard/__tests__/page.test.tsx`
- `src/components/layout/__tests__/DashboardLayout.test.tsx`

テストで検証する項目：

1. 認証済みユーザーのコンテンツ表示
2. 未認証ユーザーのリダイレクト
3. ローディング状態の表示
4. 適切なコンポーネントのレンダリング

## 使用例

```tsx
// pages/dashboard/inventory.tsx
export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          在庫管理
        </h1>
        {/* 在庫管理コンテンツ */}
      </div>
    </DashboardLayout>
  );
}
```

## スタイリング

- TailwindCSSを使用
- レスポンシブデザイン
- アクセシビリティへの配慮（WAI-ARIA準拠）

## 今後の開発計画

1. 統計情報の実装
   - 実際のデータベースとの統合
   - グラフやチャートの追加

2. アクティビティログの実装
   - ユーザーアクションの追跡
   - フィルタリング機能

3. カスタマイズ機能
   - ダッシュボードレイアウトのカスタマイズ
   - 統計情報表示の選択
