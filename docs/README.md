# SAKAMORI Documentation / SAKAMORIドキュメント

This directory contains the documentation for the SAKAMORI project.
このディレクトリにはSAKAMORIプロジェクトのドキュメントが含まれています。

## Documentation Links / ドキュメントリンク

- [English Documentation](en/README.md)
- [日本語ドキュメント](ja/README.md)

## Directory Structure / ディレクトリ構造

```
docs/
├── en/                 # English documentation
│   ├── components/     # Component documentation
│   │   ├── auth/      # Authentication components
│   │   └── layout/    # Layout components
│   └── features/      # Feature documentation
│       └── auth/      # Authentication feature
├── ja/                 # Japanese documentation
│   ├── components/     # コンポーネントのドキュメント
│   │   ├── auth/      # 認証コンポーネント
│   │   └── layout/    # レイアウトコンポーネント
│   └── features/      # 機能のドキュメント
│       └── auth/      # 認証機能
└── README.md          # This file / このファイル
```

## Documentation Guidelines

### File Naming
- Use lowercase letters and hyphens for file names
- Use `.md` extension for all documentation files
- Use the same file name across language versions

### Translation Management
- English (en) is the primary language for development
- Keep the same structure across all language versions
- Update both language versions when making changes
- Mark untranslated sections with TODO comments

### Version Control
- Include version numbers in headers when applicable
- Document last updated date
- Reference related issue/PR numbers

## Translation Status

| Document | EN | JA |
|----------|----|----|
| features/license/overview.md | ✅ | ✅ |
| features/license/application-flow.md | ❌ | ❌ |
| features/license/data-model.md | ❌ | ❌ |
| features/license/requirements.md | ❌ | ❌ |

✅ = Complete
❌ = Pending
⚠️ = Needs Update
