# SignUpFormコンポーネント

## 概要
`SignUpForm`は、SAKAMORIアプリケーションで新規ユーザー登録を処理するフォームコンポーネントです。

## 機能
- メールアドレスとパスワードの入力フィールド
- パスワード確認
- フォームバリデーション
- エラー処理と表示
- ローディング状態の管理

## 使用方法

```tsx
import { SignUpForm } from '@/components/auth/SignUpForm';

function SignUpPage() {
  return (
    <div>
      <h1>アカウント作成</h1>
      <SignUpForm />
    </div>
  );
}
```

## フォームバリデーション
- メールアドレスは有効な形式である必要がある
- パスワードは8文字以上である必要がある
- パスワードは少なくとも1つの数字を含む必要がある
- パスワード確認が一致する必要がある
- インラインでバリデーションメッセージを表示

## エラー処理

コンポーネントは以下のエラーケースを処理します：
- メールアドレスが既に使用されている
- パスワードが脆弱
- メールアドレスの形式が無効
- ネットワークエラー
- レート制限エラー

## セキュリティ機能
- パスワード強度インジケーター
- リアルタイムパスワード検証
- 安全なパスワード処理

## テスト

### ユニットテスト
`src/components/auth/__tests__/SignUpForm.test.tsx`に配置

```typescript
describe('SignUpForm', () => {
  it('全てのフォームフィールドを正しくレンダリングする', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード（確認）/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /アカウント作成/i })).toBeInTheDocument();
  });

  it('フォーム入力を検証する', async () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /アカウント作成/i });
    
    // 空フィールドのテスト
    fireEvent.click(submitButton);
    expect(await screen.findByText(/メールアドレスは必須です/i)).toBeInTheDocument();
    
    // パスワード不一致のテスト
    await userEvent.type(screen.getByLabelText(/パスワード/i), 'password123');
    await userEvent.type(screen.getByLabelText(/パスワード（確認）/i), 'password124');
    expect(await screen.findByText(/パスワードが一致しません/i)).toBeInTheDocument();
  });

  it('アカウント作成成功を処理する', async () => {
    render(<SignUpForm />);
    // フォームに入力して送信
    await userEvent.type(screen.getByLabelText(/メールアドレス/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/パスワード/i), 'password123');
    await userEvent.type(screen.getByLabelText(/パスワード（確認）/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /アカウント作成/i }));
    
    // 成功処理の検証
  });

  it('アカウント作成エラーを処理する', async () => {
    render(<SignUpForm />);
    // 様々なエラーシナリオのテスト
  });

  it('パスワード強度インジケーターを表示する', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    // 弱いパスワードのテスト
    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/パスワードが弱すぎます/i)).toBeInTheDocument();
    
    // 強いパスワードのテスト
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ssw0rd');
    expect(screen.getByText(/パスワードは十分な強度です/i)).toBeInTheDocument();
  });
});
```

### テストカバレッジ
- フォームのレンダリング
- 入力検証
- パスワード強度の検証
- パスワード確認
- エラー処理
- 成功シナリオ
- ローディング状態
- AuthProviderとの統合
- セキュリティ機能のテスト
