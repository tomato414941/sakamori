# AuthProviderコンポーネント

## 概要
`AuthProvider`は、SAKAMORIアプリケーション全体で認証状態を管理するコンテキストプロバイダーコンポーネントです。Firebase Authenticationと統合して、ユーザー認証状態を一元管理します。

## 機能
- 認証状態の管理と提供
- ユーザーのサインイン/サインアウト処理
- エラー処理
- ローディング状態の管理

## 実装

### インターフェース
```typescript
interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
```

### 使用方法

#### ルートアプリケーションの設定
```tsx
// アプリケーションのルートで使用
import { AuthProvider } from '@/components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

#### コンポーネントでの使用
```tsx
// 子コンポーネントで使用
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user, loading, error, signOut } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <SignInPrompt />;

  return (
    <div>
      <p>ようこそ、{user.email}さん</p>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
}
```

## エラー処理

コンポーネントは以下の認証エラーを処理します：

1. サインインエラー
   - メールアドレス/パスワードが無効
   - ユーザーが見つからない
   - 試行回数が多すぎる

2. サインアップエラー
   - メールアドレスが既に使用されている
   - パスワードが脆弱
   - メールアドレスの形式が無効

3. ネットワークエラー
   - 接続タイムアウト
   - サーバーに到達できない

## テスト

### ユニットテスト
`src/components/auth/__tests__/AuthProvider.test.tsx`に配置

```typescript
describe('AuthProvider', () => {
  it('子コンポーネントに認証コンテキストを提供する', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // コンテキスト値が正しく提供されているかテスト
  });

  it('サインインを処理する', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // サインイン機能をテスト
  });

  it('サインアウトを処理する', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // サインアウト機能をテスト
  });

  it('エラーを適切に処理する', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // エラー処理をテスト
  });
});
```

### テストカバレッジ
- 認証状態管理
- サインイン/アウト機能
- エラー処理
- ローディング状態
- コンテキスト値の更新

## セキュリティ考慮事項

1. 状態の保護
   - サインアウト時にユーザー状態をクリア
   - 機密データを永続化しない

2. エラーメッセージ
   - セキュリティのための一般的なエラーメッセージ
   - デバッグ用の詳細ログ

3. セッション管理
   - 自動セッション更新
   - 安全なセッション永続化
