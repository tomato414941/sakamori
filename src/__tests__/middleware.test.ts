import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

// モックの設定
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ type: 'redirect', url })),
    next: jest.fn(() => ({ type: 'next' })),
  },
}));

// モックリクエストの作成
function createMockRequest(pathname: string, hasSession = false) {
  return {
    nextUrl: {
      pathname,
      clone: () => ({
        pathname,
        set pathname(value: string) {
          this._pathname = value;
        },
        get pathname() {
          return this._pathname || pathname;
        },
      }),
    },
    cookies: {
      get: () => hasSession ? { value: 'valid-token' } : null,
    },
  };
}

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('リダイレクト：未認証ユーザーがダッシュボードにアクセス', () => {
    const response = middleware(createMockRequest('/dashboard'));
    expect(response.type).toBe('redirect');
    expect(response.url.pathname).toBe('/signin');
  });

  it('リダイレクト：未認証ユーザーが在庫管理にアクセス', () => {
    const response = middleware(createMockRequest('/inventory'));
    expect(response.type).toBe('redirect');
    expect(response.url.pathname).toBe('/signin');
  });

  it('通過：認証済みユーザーがダッシュボードにアクセス', () => {
    const response = middleware(createMockRequest('/dashboard', true));
    expect(response.type).toBe('next');
  });

  it('通過：認証済みユーザーが在庫管理にアクセス', () => {
    const response = middleware(createMockRequest('/inventory', true));
    expect(response.type).toBe('next');
  });

  it('通過：未認証ユーザーが公開ページにアクセス', () => {
    const response = middleware(createMockRequest('/about'));
    expect(response).toBeUndefined();
  });
});
