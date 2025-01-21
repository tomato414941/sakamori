# Testing Strategy

## Overview
This document outlines the testing approach for the SAKAMORI project, ensuring code quality and reliability.

## Test Types

### 1. Unit Tests
- **Tool**: Jest + React Testing Library
- **Location**: `__tests__` directories alongside components
- **Purpose**: Test individual components and functions
- **Naming Convention**: `*.test.tsx` or `*.test.ts`

### 2. Integration Tests
- **Tool**: Jest + React Testing Library
- **Location**: `__tests__` directories
- **Purpose**: Test component interactions and data flow
- **Focus Areas**:
  - Component composition
  - Hook interactions
  - API integrations

### 3. E2E Tests (To be implemented)
- **Tool**: Cypress (planned)
- **Location**: `cypress/e2e`
- **Purpose**: Test complete user flows
- **Priority Flows**:
  - Authentication
  - License management
  - Inventory operations

## Test Organization

### Directory Structure
```
src/
├── components/
│   └── layout/
│       ├── Header.tsx
│       └── __tests__/
│           └── Header.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── __mocks__/
│       └── useAuth.ts
└── __tests__/
    └── integration/
```

### Mocking Strategy
- Use `__mocks__` directories for module mocks
- Mock external services and APIs
- Prefer mock implementations over mock data

## Testing Guidelines

### Component Tests
1. Test both rendered output and behavior
2. Cover all meaningful component states
3. Test accessibility where applicable
4. Include responsive design tests

### Hook Tests
1. Test all possible states
2. Mock external dependencies
3. Test error conditions
4. Verify cleanup functions

### Test Coverage
- Aim for 80% coverage for critical paths
- Focus on business logic coverage
- Don't chase 100% coverage blindly

## Running Tests

### Commands
- `npm test`: Run all tests
- `npm test:watch`: Run tests in watch mode
- `npm test:coverage`: Run tests with coverage report (to be added)

### CI/CD Integration (Planned)
- Run tests on pull requests
- Block merges on test failures
- Generate and store coverage reports

## Best Practices

### Do's
- Write tests before fixing bugs
- Keep tests focused and simple
- Use meaningful test descriptions
- Test error states and edge cases

### Don'ts
- Don't test implementation details
- Don't write brittle tests
- Don't duplicate test coverage
- Don't ignore test failures

## Error Handling Tests

### Testing Approach
1. **エラーの種類ごとのテスト**
   - ユーザー入力エラー
   - API/サービスエラー
   - ネットワークエラー
   - バリデーションエラー

2. **エラー状態の検証**
   - エラーメッセージの表示
   - UIの状態変更
   - エラー後のリカバリー

### Example: Authentication Error Test
```typescript
it('handles auth errors', async () => {
  // エラーを発生させるモックの設定
  mockSignIn.mockRejectedValue(new Error('Auth error'));

  // コンポーネントのレンダリング
  render(<AuthComponent />);

  // ユーザーアクションの実行
  await userEvent.click(screen.getByText('Sign In'));

  // エラー状態の検証
  expect(screen.getByTestId('error')).toHaveTextContent('Auth error');
});
```

## Mocking Best Practices

### 1. モックの粒度
- **ユニットテスト**: 外部依存を完全にモック
- **統合テスト**: 重要な依存のみ実装を保持
- **E2Eテスト**: モックを最小限に抑える

### 2. モック実装のガイドライン
```typescript
// 良い例：具体的な実装
const mockAuth = {
  signIn: jest.fn().mockImplementation(async (email, password) => {
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }
    return { user: { email } };
  })
};

// 避けるべき例：過度に単純化
const mockAuth = {
  signIn: jest.fn().mockResolvedValue({ success: true })
};
```

### 3. モックの再利用
- `__mocks__` ディレクトリを活用
- 共通のモックファクトリを作成
- テスト間でモックを共有

## Asynchronous Testing

### 1. 非同期処理の待機
```typescript
// React Testing Libraryのactを使用
await act(async () => {
  await userEvent.click(button);
  await Promise.resolve(); // マイクロタスクの完了を待機
});

// 状態の変更を待機
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

### 2. タイミング制御
- `jest.useFakeTimers()`でタイマーを制御
- `jest.advanceTimersByTime()`で時間を進める
- `jest.runAllTimers()`ですべてのタイマーを実行

### 3. 非同期エラーの処理
```typescript
// エラーハンドリングのテスト
await expect(async () => {
  await component.triggerAsyncAction();
}).rejects.toThrow('Expected error');

// 非同期エラー後のUI更新の検証
await waitFor(() => {
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
});
```

## Future Improvements
- [ ] Add E2E testing with Cypress
- [ ] Implement visual regression testing
- [ ] Add performance testing
- [ ] Improve test coverage reporting
