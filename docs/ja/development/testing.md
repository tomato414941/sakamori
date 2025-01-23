# テスト戦略

## 概要
このドキュメントでは、SAKAMORIプロジェクトのコード品質と信頼性を確保するためのテストアプローチについて説明します。

## テストの種類

### 1. ユニットテスト
- **ツール**: Jest + React Testing Library
- **配置場所**: コンポーネントと同階層の`__tests__`ディレクトリ
- **目的**: 個別のコンポーネントと関数のテスト
- **命名規則**: `*.test.tsx`または`*.test.ts`

### 2. 統合テスト
- **ツール**: Jest + React Testing Library
- **配置場所**: `__tests__`ディレクトリ
- **目的**: コンポーネント間の相互作用とデータフローのテスト
- **重点領域**:
  - コンポーネントの構成
  - フックの相互作用
  - API統合

### 3. エンドツーエンドテスト
- **ツール**: Cypress
- **配置場所**: `cypress/e2e`
- **目的**: 完全なユーザーフローのテスト
- **カバレッジ**: 重要なビジネスパス

## テストの構成

### ディレクトリ構造
```
src/
  components/
    ComponentName/
      __tests__/
        ComponentName.test.tsx
      ComponentName.tsx
  hooks/
    __tests__/
      useHookName.test.ts
    useHookName.ts
cypress/
  e2e/
    feature-name.cy.ts
```

### ファイル命名
- ユニット/統合テスト: `[filename].test.ts(x)`
- E2Eテスト: `[feature-name].cy.ts`

## テストガイドライン

### 1. コンポーネントテスト
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('クラッシュせずにレンダリングされる', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('クリックイベントを処理する', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 2. フックテスト
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('カウンターをインクリメントする', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### 3. APIテスト
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { APIComponent } from './APIComponent';
import { fetchData } from './api';

jest.mock('./api');

describe('APIComponent', () => {
  it('APIエラーを処理する', async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error('APIエラー'));
    
    render(<APIComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
    });
  });
});
```

## ベストプラクティス

1. **テストの構成**
   - `describe`ブロックで関連するテストをグループ化
   - 明確なテストの説明
   - AAAパターン（配置、実行、検証）の順守

2. **カバレッジ目標**
   - ユニットテスト: 80%のカバレッジ
   - 統合テスト: 重要なパス
   - E2Eテスト: 主要なユーザーフロー

3. **モックの使用**
   - 外部依存関係のモック化
   - 一貫性のあるモックデータの使用
   - テスト間でのモックのリセット

4. **テストの優先順位**
   - ビジネスロジック
   - ユーザー操作
   - エラー処理
   - エッジケース

## CI/CD統合

### GitHub Actionsワークフロー
```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 依存関係のインストール
        run: npm install
      - name: テストの実行
        run: npm test
      - name: E2Eテストの実行
        run: npm run test:e2e
```

## メンテナンス

1. **定期的な更新**
   - テストライブラリの更新
   - コード変更に伴うテストの見直しと更新
   - 不要なテストの削除

2. **パフォーマンス**
   - テスト実行時間の監視
   - 遅いテストの最適化
   - テストの並列実行の活用

3. **ドキュメント**
   - テストパターンの文書化
   - テストガイドラインの維持
   - テストドキュメントの更新
