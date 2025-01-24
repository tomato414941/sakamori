# 認証システム

## 概要

SAKAMORIの認証システムはFirebase Authenticationを使用して実装されています。
メールアドレスとパスワードによる認証を提供し、安全なユーザー管理を実現します。

## 認証フロー

1. **サインアップ**
   - メールアドレスとパスワードを入力
   - パスワード確認（最低8文字）
   - アカウント作成後に自動サインイン

2. **サインイン**
   - メールアドレスとパスワードによる認証
   - 成功時にダッシュボードへリダイレクト

3. **サインアウト**
   - ヘッダーのサインアウトボタンをクリック
   - サインインページへリダイレクト

## 実装の詳細

### Firebase設定
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 認証フック
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
```

## セキュリティ対策

### パスワード要件
- 最低8文字
- 大文字を1文字以上含む
- 数字を1文字以上含む
- 特殊文字を1文字以上含む

### レート制限
- 15分間で最大5回のログイン失敗
- 5回の失敗後にアカウントロック

### セッション管理
- JWTベースの認証
- 1時間後のトークン有効期限切れ
- 自動トークン更新

## エラー処理

### 一般的なエラーケース
1. メールアドレスの形式が無効
   ```typescript
   if (!isValidEmail(email)) {
     throw new Error('メールアドレスの形式が無効です');
   }
   ```

2. パスワードが脆弱
   ```typescript
   if (!meetsPasswordRequirements(password)) {
     throw new Error('パスワードが要件を満たしていません');
   }
   ```

3. アカウントが既に存在
   ```typescript
   try {
     await createUserWithEmailAndPassword(auth, email, password);
   } catch (error) {
     if (error.code === 'auth/email-already-in-use') {
       throw new Error('アカウントが既に存在します');
     }
   }
   ```

## テスト

### ユニットテスト
```typescript
describe('認証', () => {
  it('有効な認証情報でサインインできる', async () => {
    const { user } = await signInWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );
    expect(user).toBeDefined();
  });

  it('無効な認証情報で失敗する', async () => {
    await expect(
      signInWithEmailAndPassword(auth, 'test@example.com', 'wrongpassword')
    ).rejects.toThrow();
  });
});
```

### 統合テスト
```typescript
describe('認証フロー', () => {
  it('サインアップフローを完了する', async () => {
    // サインアップフォームに入力
    await userEvent.type(screen.getByLabelText(/メールアドレス/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/パスワード/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /アカウント作成/i }));

    // ダッシュボードへのリダイレクトを確認
    expect(await screen.findByText(/ダッシュボード/i)).toBeInTheDocument();
  });
});
```
