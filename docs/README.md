# SAKAMORI Documentation

This directory contains the documentation for the SAKAMORI project.

## Directory Structure

```
docs/
├── en/                 # English documentation
│   └── features/       # Feature documentation
│       └── license/    # License management feature
├── ja/                 # Japanese documentation
│   └── features/       # 機能に関するドキュメント
│       └── license/    # ライセンス管理機能
└── README.md          # This file
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
