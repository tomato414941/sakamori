import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from '../i18n';

// next-intlミドルウェアを作成
const intlMiddleware = createMiddleware({
  // デフォルト言語を設定
  defaultLocale: 'ja',
  // サポートする言語を設定
  locales,
  // 言語設定を記憶
  localePrefix: 'as-needed'
});

export default async function middleware(request: NextRequest) {
  // 保護されたルートのパターン
  const protectedRoutes = ['/dashboard'];
  const pathname = request.nextUrl.pathname;

  // next-intlミドルウェアを適用
  const response = intlMiddleware(request);

  // 保護されたルートへのアクセスをチェック
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('session');
    if (!token) {
      const url = new URL('/signin', request.url);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
