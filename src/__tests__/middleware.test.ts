import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

// モックの設定
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ type: 'redirect', url })),
    next: jest.fn(() => ({ type: 'next' })),
  },
}));

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('リダイレクト：未認証ユーザーがダッシュボードにアクセス', () => {
    const mockRequest = {
      nextUrl: { pathname: '/dashboard' },
      cookies: { get: () => null },
    };

    const response = middleware(mockRequest);
    expect(response.type).toBe('redirect');
    expect(response.url).toContain('/signin');
  });

  it('リダイレクト：未認証ユーザーが在庫管理にアクセス', () => {
    const mockRequest = {
      nextUrl: { pathname: '/inventory' },
      cookies: { get: () => null },
    };

    const response = middleware(mockRequest);
    expect(response.type).toBe('redirect');
    expect(response.url).toContain('/signin');
  });

  it('通過：認証済みユーザーがダッシュボードにアクセス', () => {
    const mockRequest = {
      nextUrl: { pathname: '/dashboard' },
      cookies: { get: () => ({ value: 'valid-token' }) },
    };

    const response = middleware(mockRequest);
    expect(response.type).toBe('next');
  });

  it('通過：認証済みユーザーが在庫管理にアクセス', () => {
    const mockRequest = {
      nextUrl: { pathname: '/inventory' },
      cookies: { get: () => ({ value: 'valid-token' }) },
    };

    const response = middleware(mockRequest);
    expect(response.type).toBe('next');
  });

  it('通過：未認証ユーザーが公開ページにアクセス', () => {
    const mockRequest = {
      nextUrl: { pathname: '/about' },
      cookies: { get: () => null },
    };

    const response = middleware(mockRequest);
    expect(response).toBeUndefined();
  });
});
