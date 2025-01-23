import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

// Mock setup
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ type: 'redirect', url })),
    next: jest.fn(() => ({ type: 'next' })),
  },
}));

// Helper function to create mock request
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

  it('should redirect unauthenticated user accessing dashboard', () => {
    const response = middleware(createMockRequest('/dashboard'));
    expect(response.type).toBe('redirect');
    expect(response.url.pathname).toBe('/signin');
  });

  it('should redirect unauthenticated user accessing inventory', () => {
    const response = middleware(createMockRequest('/inventory'));
    expect(response.type).toBe('redirect');
    expect(response.url.pathname).toBe('/signin');
  });

  it('should allow authenticated user to access dashboard', () => {
    const response = middleware(createMockRequest('/dashboard', true));
    expect(response.type).toBe('next');
  });

  it('should allow authenticated user to access inventory', () => {
    const response = middleware(createMockRequest('/inventory', true));
    expect(response.type).toBe('next');
  });

  it('should allow unauthenticated user to access public page', () => {
    const response = middleware(createMockRequest('/about'));
    expect(response).toBeUndefined();
  });
});
