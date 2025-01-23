import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

// 保護するルートを指定
export const config = {
  matcher: [
    // ダッシュボード関連のルート
    '/dashboard/:path*',
    // 在庫管理関連のルート
    '/inventory/:path*',
  ]
};
