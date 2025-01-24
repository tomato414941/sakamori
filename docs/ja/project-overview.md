# プロジェクト概要

## SAKAMORIとは？
SAKAMORIは、日本の酒類小売業者向けの統合管理システムです。免許管理、在庫管理、販売管理を効率化し、業務プロセスを改善することを目的としています。

## 主要機能
- 免許申請管理
- 在庫管理
- 販売管理
- レポーティングツール

## 技術スタック
### バックエンド
- Firebase Authentication: ユーザー認証
- Cloud Firestore: データベース
- Cloud Functions: サーバーレス関数

### フロントエンド（Web）
- Next.js 15.1.5
- React 19.0.0
- TailwindCSS 3.4.1

## プロジェクト構造
```
sakamori/
├── src/
│   ├── app/           # Next.jsアプリルーター
│   ├── components/    # Reactコンポーネント
│   ├── hooks/         # カスタムReactフック
│   ├── lib/           # ユーティリティ関数と設定
│   ├── styles/        # グローバルスタイルとTailwind設定
│   └── types/         # TypeScript型定義
├── public/           # 静的アセット
├── docs/            # プロジェクトドキュメント
└── tests/           # テストファイル
```

## 始め方

### 前提条件
- Node.js 20.0.0以降
- npm 10.0.0以降
- 認証とFirestoreが有効化されたFirebaseプロジェクト

### インストール
1. リポジトリのクローン
   ```bash
   git clone https://github.com/your-username/sakamori.git
   cd sakamori
   ```

2. 依存関係のインストール
   ```bash
   npm install
   ```

3. 環境変数の設定
   ```bash
   cp .env.example .env.local
   # .env.localにFirebaseの設定を記入
   ```

4. 開発サーバーの起動
   ```bash
   npm run dev
   ```

## 開発ガイドライン

### コードスタイル
- ESLintとPrettierの設定に従う
- 型安全性のためTypeScriptを使用
- コンポーネントベースのアーキテクチャに従う
- 新機能にはユニットテストを書く

### テスト
- JestとReact Testing Libraryによるユニットテスト
- CypressによるE2Eテスト
- コミット前にテストを実行：
  ```bash
  npm run test
  ```

### ドキュメント
- 新機能とAPIをドキュメント化
- コードの変更に合わせてドキュメントを更新
- 日本語と英語の両方でドキュメントを作成
