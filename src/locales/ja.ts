export const ja = {
  common: {
    appName: 'SAKAMORI',
    description: '通信販売酒類小売業免許申請支援システム',
    loading: '読み込み中...',
    save: '保存',
    next: '次へ',
    back: '戻る',
    cancel: 'キャンセル',
    edit: '編集',
    delete: '削除',
    required: '必須',
  },
  home: {
    hero: {
      title: '通信販売酒類小売業免許の申請をもっと簡単に',
      description: 'SAKAMORIは、通信販売酒類小売業免許の申請に必要な書類作成をサポートするシステムです。申請要件の確認から書類の作成まで、スムーズな免許取得をお手伝いします。',
      dashboard: '申請を始める',
    },
    features: {
      license: {
        title: '申請書類作成支援',
        description: '通信販売酒類小売業免許の申請に必要な書類作成をステップバイステップでサポート。必要な情報を入力するだけで、申請書類が完成します。',
      },
      requirements: {
        title: '要件確認',
        description: '免許取得に必要な要件を分かりやすく解説。あなたが申請可能かどうかを事前に確認できます。',
      },
      guidance: {
        title: '申請手続きガイド',
        description: '申請から取得までの流れを詳しく説明。必要書類や申請先の税務署についても分かりやすく解説します。',
      },
    },
  },
  dashboard: {
    title: '申請ダッシュボード',
    description: 'ステップバイステップで申請を進めましょう',
    steps: {
      requirements: {
        title: '要件確認',
        description: '申請に必要な要件を確認します',
        status: {
          notStarted: '未開始',
          inProgress: '確認中',
          completed: '確認済み',
        },
      },
      documents: {
        title: '申請書類作成',
        description: '必要な書類を作成します',
        status: {
          notStarted: '未開始',
          inProgress: '作成中',
          completed: '作成済み',
        },
      },
      guide: {
        title: '申請手続き',
        description: '申請の流れを確認します',
      },
    },
    requirements: {
      title: '申請要件チェックリスト',
      description: '以下の要件を確認してください',
      categories: {
        personal: {
          title: '個人要件',
          items: {
            age: '20歳以上である',
            residence: '日本国内に住所を有する',
            disqualification: '欠格事由に該当しない',
          },
        },
        business: {
          title: '事業要件',
          items: {
            location: '通信販売酒類小売業免許を受けようとする販売場の所在地を管轄する税務署の管轄区域内に住所又は事業所を有すること',
            experience: '酒類の販売業務に関する経験を有する者を従業員として配置できること',
            facilities: '酒類の販売業務を行うために必要な施設を有すること',
          },
        },
        financial: {
          title: '経済的要件',
          items: {
            capital: '資本金等の額が1,000万円以上であること',
            stability: '経済的に安定していること',
          },
        },
      },
    },
    documents: {
      title: '申請書類作成',
      description: '必要な書類を作成します',
      types: {
        application: {
          title: '申請書',
          description: '通信販売酒類小売業免許の申請書',
        },
        businessPlan: {
          title: '事業計画書',
          description: '通信販売による酒類の販売計画等',
        },
        attachments: {
          title: '添付書類',
          description: '定款、登記事項証明書、納税証明書等',
        },
      },
    },
    guide: {
      title: '申請手続きガイド',
      description: '申請の流れを説明します',
      steps: {
        preparation: {
          title: '事前準備',
          description: '必要書類の準備と要件の確認',
        },
        submission: {
          title: '申請書提出',
          description: '税務署への申請書類の提出',
        },
        interview: {
          title: '面接調査',
          description: '税務署による面接調査',
        },
        inspection: {
          title: '現地調査',
          description: '販売場等の現地調査',
        },
        issuance: {
          title: '免許交付',
          description: '免許の交付',
        },
      },
    },
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
    notSignedIn: '未ログイン',
    error: {
      invalidEmail: '有効なメールアドレスを入力してください',
      required: 'この項目は必須です',
      invalidCredentials: 'メールアドレスまたはパスワードが正しくありません',
      passwordMismatch: 'パスワードが一致しません',
      passwordTooShort: 'パスワードは8文字以上である必要があります',
      emailInUse: 'このメールアドレスは既に使用されています',
      weakPassword: 'パスワードが脆弱です。より強力なパスワードを設定してください',
      tooManyRequests: 'アクセスが集中しています。しばらく時間をおいてから再度お試しください',
      networkError: 'ネットワークエラーが発生しました。インターネット接続を確認してください',
      operationNotAllowed: 'この操作は許可されていません',
      requiresRecentLogin: '認証の有効期限が切れています。再度ログインしてください',
      unknown: '予期せぬエラーが発生しました',
    },
  },
  profile: {
    title: 'プロファイル設定',
    displayName: '表示名',
    companyName: '会社名',
    phoneNumber: '電話番号',
    save: '保存',
    updateSuccess: 'プロファイルを更新しました',
    updateError: 'プロファイルの更新に失敗しました',
  },
} as const;
