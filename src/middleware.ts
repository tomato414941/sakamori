import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 言語設定のミドルウェア
const intlMiddleware = createMiddleware({
  locales: ['en', 'ja'],
  defaultLocale: 'ja',
});

export function middleware(request: NextRequest) {
  // 保護されたルートかどうかを確認
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/inventory');

  // 保護されていないルートはスキップ
  if (!isProtectedRoute) {
    return;
  }

  // セッションの確認
  const session = request.cookies.get('session');

  // 未認証の場合はサインインページにリダイレクト
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // 言語設定のミドルウェアを適用
  return intlMiddleware(request);
}

// 保護するルートを指定
export const config = {
  matcher: [
    // ダッシュボード関連のルート
    '/dashboard/:path*',
    // 在庫管理関連のルート
    '/inventory/:path*',
    // next-intlミドルウェアを適用するパス
    '/((?!api|_next|.*\\..*).*)'
  ]
};
