# SignInFormコンポーネント

## 概要
`SignInForm`は、SAKAMORIアプリケーションでユーザーのサインイン機能を処理するフォームコンポーネントです。

## 機能
- メールアドレスとパスワードの入力フィールド
- フォームバリデーション
- エラー処理と表示
- ローディング状態の管理

## 使用方法

```tsx
import { SignInForm } from '@/components/auth/SignInForm';

function SignInPage() {
  return (
    <div>
      <h1>サインイン</h1>
      <SignInForm />
    </div>
  );
}
```

## エラー処理

コンポーネントは以下のエラーケースを処理します：
- メールアドレスの形式が無効
- 認証情報が無効
- ネットワークエラー
- レート制限エラー

## フォームバリデーション
- メールアドレスは有効な形式である必要がある
- パスワードフィールドは空にできない
- インラインでバリデーションメッセージを表示

## テスト

### ユニットテスト
`src/components/auth/__tests__/SignInForm.test.tsx`に配置

```typescript
describe('SignInForm', () => {
  it('全てのフォームフィールドを正しくレンダリングする', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /サインイン/i })).toBeInTheDocument();
  });

  it('フォーム入力を検証する', async () => {
    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /サインイン/i });
    
    // 空フィールドのテスト
    fireEvent.click(submitButton);
    expect(await screen.findByText(/メールアドレスは必須です/i)).toBeInTheDocument();
    
    // 無効なメールアドレスのテスト
    fireEvent.change(screen.getByLabelText(/メールアドレス/i), {
      target: { value: 'invalid-email' },
    });
    expect(await screen.findByText(/メールアドレスの形式が無効です/i)).toBeInTheDocument();
  });

  it('サインイン成功を処理する', async () => {
    render(<SignInForm />);
    // フォームに入力して送信
    await userEvent.type(screen.getByLabelText(/メールアドレス/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/パスワード/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /サインイン/i }));
    
    // 成功処理の検証
  });

  it('サインインエラーを処理する', async () => {
    render(<SignInForm />);
    // 様々なエラーシナリオのテスト
  });
});
```

### テストカバレッジ
- フォームのレンダリング
- 入力検証
- エラー処理
- 成功シナリオ
- ローディング状態
- AuthProviderとの統合
