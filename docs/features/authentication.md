# Authentication

## Overview
SAKAMORIの認証システムは、Firebase Authenticationを利用して実装されています。このドキュメントでは、認証機能の実装詳細と使用方法について説明します。

## 機能
- メールアドレス/パスワードによるサインイン
- 新規ユーザー登録
- サインアウト
- パスワードリセット

## 実装構成

### コンポーネント構造
```
src/
├── components/
│   └── auth/
│       ├── AuthProvider.tsx      # 認証状態の管理
│       ├── SignInForm.tsx        # サインインフォーム
│       └── SignUpForm.tsx        # サインアップフォーム
└── hooks/
    └── useAuth.ts               # 認証フックス
```

### AuthProvider
認証状態を管理し、アプリケーション全体で認証情報を共有するためのコンテキストプロバイダーです。

#### 使用方法
```tsx
// _app.tsx
import { AuthProvider } from '@/components/auth/AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

#### 提供される機能
- `user`: 現在のユーザー情報
- `loading`: 認証状態の読み込み状態
- `error`: 認証エラー情報
- `signIn`: サインイン関数
- `signUp`: サインアップ関数
- `signOut`: サインアウト関数
- `resetPassword`: パスワードリセット関数

### useAuth Hook
AuthProviderの機能を簡単に利用するためのカスタムフックです。

#### 使用方法
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, signIn, error } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('サインインに失敗しました:', error);
    }
  };

  return (
    <div>
      {user ? (
        <p>ようこそ、{user.email}さん</p>
      ) : (
        <button onClick={handleSignIn}>サインイン</button>
      )}
      {error && <p>エラー: {error.message}</p>}
    </div>
  );
}
```

## エラーハンドリング
認証機能は以下のようなエラーを適切に処理します：

### 想定されるエラー
1. サインイン失敗
   - 無効なメールアドレス/パスワード
   - 存在しないアカウント
2. サインアップ失敗
   - すでに使用されているメールアドレス
   - パスワード要件不足
3. パスワードリセット失敗
   - 存在しないメールアドレス
   - メール送信の失敗

### エラー処理の実装
```tsx
try {
  await signIn(email, password);
} catch (error) {
  // エラーはAuthProviderで自動的に状態に保存されます
  // error.messageでエラーメッセージを取得可能
}
```

## テスト
認証機能は、Jest + React Testing Libraryを使用して徹底的にテストされています。

### テストの範囲
1. 認証状態の管理
   - 初期状態の確認
   - 状態変更の検証
2. エラーハンドリング
   - 各種エラーケースの検証
   - エラーメッセージの表示
3. ユーザーインタラクション
   - フォーム入力の処理
   - ボタンクリックの処理

### テストの実行
```bash
# 全テストの実行
npm test

# 認証関連のテストのみ実行
npm test auth
```

## セキュリティ考慮事項
1. パスワードの要件
   - 最小8文字
   - 大文字小文字を含む
   - 数字を含む

2. レート制限
   - サインイン試行回数の制限
   - パスワードリセットメールの送信回数制限

3. セッション管理
   - 自動サインアウト（未実装）
   - デバイス管理（未実装）

## 今後の改善予定
- [ ] ソーシャルログインの追加
- [ ] 二要素認証の実装
- [ ] セッション管理の強化
- [ ] ユーザープロフィールの拡充
