import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

// NextRequestのモック
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    NextRequest: jest.fn().mockImplementation((url) => ({
      url,
      cookies: {
        get: jest.fn((name) => ({
          name,
          value: 'mock-cookie-value'
        }))
      }
    })),
    NextResponse: {
      redirect: jest.fn().mockImplementation((url) => ({
        status: 307,
        headers: new Map([['location', url]])
      })),
      next: jest.fn().mockImplementation(() => ({
        status: 200,
        headers: new Map()
      }))
    }
  };
});

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('リダイレクト：未認証ユーザーがダッシュボードにアクセス', () => {
    const request = {
      url: 'http://localhost:3000/dashboard',
      cookies: {
        get: jest.fn().mockReturnValue(null)
      }
    };
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/signin');
  });

  it('リダイレクト：未認証ユーザーが在庫管理にアクセス', () => {
    const request = {
      url: 'http://localhost:3000/inventory',
      cookies: {
        get: jest.fn().mockReturnValue(null)
      }
    };
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/signin');
  });

  it('通過：認証済みユーザーがダッシュボードにアクセス', () => {
    const request = {
      url: 'http://localhost:3000/dashboard',
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-session-token' })
      }
    };
    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it('通過：認証済みユーザーが在庫管理にアクセス', () => {
    const request = {
      url: 'http://localhost:3000/inventory',
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-session-token' })
      }
    };
    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it('通過：未認証ユーザーが公開ページにアクセス', () => {
    const request = {
      url: 'http://localhost:3000/about',
      cookies: {
        get: jest.fn().mockReturnValue(null)
      }
    };
    const response = middleware(request);

    expect(response).toBeUndefined();
  });
});
