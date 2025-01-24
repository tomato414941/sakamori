export const ja = {
  common: {
    appName: 'SAKAMORI',
    description: '酒類小売業者向け統合管理システム',
  },
  auth: {
    signIn: 'ログイン',
    signUp: '新規登録',
    signOut: 'ログアウト',
    email: 'メールアドレス',
    password: 'パスワード',
    confirmPassword: 'パスワード（確認）',
    forgotPassword: 'パスワードを忘れた場合',
    noAccount: 'アカウントをお持ちでない場合',
    haveAccount: 'すでにアカウントをお持ちの場合',
    error: {
      invalidEmail: '有効なメールアドレスを入力してください',
      required: 'この項目は必須です',
      invalidCredentials: 'メールアドレスまたはパスワードが正しくありません',
      passwordMismatch: 'パスワードが一致しません',
      passwordTooShort: 'パスワードは8文字以上である必要があります',
      signUpFailed: 'アカウントの作成に失敗しました。もう一度お試しください。',
    },
  },
  nav: {
    dashboard: 'ダッシュボード',
    inventory: '在庫管理',
    sales: '売上管理',
    licenses: 'ライセンス管理',
    settings: '設定',
  },
} as const;
