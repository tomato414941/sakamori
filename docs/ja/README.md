# SAKAMORIドキュメント

このディレクトリにはSAKAMORIプロジェクトのドキュメントが含まれています。

## ディレクトリ構造

```
docs/
├── en/                 # 英語ドキュメント
│   ├── components/     # Component documentation
│   │   ├── auth/      # Authentication components
│   │   └── layout/    # Layout components
│   └── features/      # Feature documentation
│       └── auth/      # Authentication feature
├── ja/                 # 日本語ドキュメント
│   ├── components/     # コンポーネントのドキュメント
│   │   ├── auth/      # 認証コンポーネント
│   │   └── layout/    # レイアウトコンポーネント
│   └── features/      # 機能のドキュメント
│       └── auth/      # 認証機能
└── README.md          # このファイル
```

## ドキュメント作成ガイドライン

### ファイル名
- 小文字とハイフンを使用
- すべてのドキュメントファイルは`.md`拡張子を使用
- 英語と日本語のドキュメントは別ファイルで作成

### コンテンツ構造
- H1（`#`）を使用して明確なタイトルで開始
- 簡潔な概要または導入を含める
- 適切な見出しレベル（H2、H3など）を使用
- 関連するコード例を含める
- 概念の説明に役立つ図や画像を追加

### コード例
- 言語を指定してシンタックスハイライトを使用
- 例は簡潔で焦点を絞ったものにする
- 複雑な部分にはコメントを付ける
- すべてのコード例がテスト済みで動作することを確認

### 画像と図
- 画像は`public/images/docs`ディレクトリに保存
- 説明的なファイル名を使用
- Web表示用に画像を最適化
- アクセシビリティのためのalt textを含める

### 更新とメンテナンス
- ドキュメントをコードの変更と同期させる
- 定期的にドキュメントをレビューして更新
- 古い情報を削除
- 英語版と日本語版の一貫性を維持
