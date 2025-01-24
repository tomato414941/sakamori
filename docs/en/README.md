# SAKAMORI Documentation

This directory contains the documentation for the SAKAMORI project.

## Directory Structure

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
└── README.md          # This file
```

## Documentation Guidelines

### File Naming
- Use lowercase letters and hyphens for file names
- Use `.md` extension for all documentation files
- Create separate files for English and Japanese documentation

### Content Structure
- Start with a clear title using H1 (`#`)
- Include a brief overview or introduction
- Use appropriate heading levels (H2, H3, etc.)
- Include code examples where relevant
- Add diagrams or images when they help explain concepts

### Code Examples
- Use syntax highlighting by specifying the language
- Keep examples concise and focused
- Include comments to explain complex parts
- Ensure all code examples are tested and working

### Images and Diagrams
- Store images in the `public/images/docs` directory
- Use descriptive file names
- Optimize images for web viewing
- Include alt text for accessibility

### Updates and Maintenance
- Keep documentation in sync with code changes
- Review and update documentation regularly
- Remove outdated information
- Maintain consistency between English and Japanese versions
