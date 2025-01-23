import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

// NextRequestのモック
function createMockRequest(url: string, cookies: Record<string, string> = {}) {
  return new NextRequest(new URL(url, 'http://localhost:3000'), {
    cookies: new Map(Object.entries(cookies)),
  });
}

describe('Auth Middleware', () => {
  it('リダイレクト：未認証ユーザーがダッシュボードにアクセス', async () => {
    const request = createMockRequest('/dashboard');
    const response = await middleware(request);

    expect(response?.status).not.toBe(200);
    expect(response?.headers.get('location')).toBe('http://localhost:3000/signin');
  });

  it('リダイレクト：未認証ユーザーが在庫管理にアクセス', async () => {
    const request = createMockRequest('/inventory');
    const response = await middleware(request);

    expect(response?.status).not.toBe(200);
    expect(response?.headers.get('location')).toBe('http://localhost:3000/signin');
  });

  it('通過：認証済みユーザーがダッシュボードにアクセス', async () => {
    const request = createMockRequest('/dashboard', {
      session: 'valid-session-token',
    });
    const response = await middleware(request);

    expect(response?.status).toBe(200);
    expect(response?.headers.get('location')).toBeNull();
  });

  it('通過：認証済みユーザーが在庫管理にアクセス', async () => {
    const request = createMockRequest('/inventory', {
      session: 'valid-session-token',
    });
    const response = await middleware(request);

    expect(response?.status).toBe(200);
    expect(response?.headers.get('location')).toBeNull();
  });

  it('通過：未認証ユーザーが公開ページにアクセス', async () => {
    const request = createMockRequest('/about');
    const response = await middleware(request);

    expect(response).toBeUndefined();
  });
});
