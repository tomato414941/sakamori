import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './locales';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /から始まるパスのみを処理
  if (!pathname.startsWith('/')) {
    return NextResponse.next();
  }

  // 静的ファイルは無視
  if (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // パスからロケールを取得
  const pathnameLocale = pathname.split('/')[1] as string;

  // ロケールが指定されていない場合はデフォルトロケールにリダイレクト
  if (!pathnameLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 無効なロケールの場合はデフォルトロケールにリダイレクト
  if (!locales.includes(pathnameLocale as any)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname.substring(pathnameLocale.length + 1)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
