# AuthProvider Component

## Overview
`AuthProvider`は、SAKAMORIアプリケーション全体で認証状態を管理するためのコンテキストプロバイダーコンポーネントです。Firebase Authenticationと統合され、ユーザーの認証状態を一元管理します。

## 機能
- 認証状態の管理と提供
- ユーザーのサインイン/サインアウト処理
- エラーハンドリング
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

// 子コンポーネントでの使用
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user, loading, error, signOut } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## エラーハンドリング

### エラーの種類
1. **認証エラー**
   - 無効な認証情報
   - アカウント未存在
   - パスワード不一致

2. **ネットワークエラー**
   - 接続エラー
   - タイムアウト

3. **その他のエラー**
   - 予期せぬエラー
   - Firebaseサービスエラー

### エラー処理の実装
```typescript
try {
  setState(prev => ({ ...prev, loading: true, error: null }));
  await authAction();
} catch (error) {
  setState(prev => ({
    ...prev,
    error: error instanceof Error ? error : new Error('An unknown error occurred')
  }));
} finally {
  setState(prev => ({ ...prev, loading: false }));
}
```

## テスト

### テストケース
1. **初期状態**
   - 適切な初期値の設定
   - ローディング状態の確認

2. **認証フロー**
   - サインイン成功/失敗
   - サインアウト処理
   - パスワードリセット

3. **エラーハンドリング**
   - 各種エラーの適切な処理
   - エラーメッセージの表示
   - 状態の回復

### テスト例
```typescript
describe('AuthProvider', () => {
  it('provides initial auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged out');
    });
  });

  it('handles auth errors', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Sign In'));
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Auth error');
  });
});
```

## パフォーマンス考慮事項

### メモ化
- 状態更新の最適化
- 不要な再レンダリングの防止
- コンテキスト分割の検討

### クリーンアップ
- リスナーの適切な解除
- メモリリークの防止
- 状態のリセット

## セキュリティ考慮事項
1. 認証状態の保護
2. セッション管理
3. エラーメッセージの適切な表示

## 今後の改善予定
- [ ] リフレッシュトークンの実装
- [ ] セッションタイムアウトの管理
- [ ] 多要素認証のサポート
- [ ] ソーシャルログインの統合
