import { SUPPORTED_LOCALES } from '@/lib/metadata/i18n'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

// Extract just the locale codes: ['en', 'ja']
const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map(locale => locale.code);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip next.js internals or public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If path already starts with a locale like /en or /ja
  const hasLocale = SUPPORTED_LOCALE_CODES.some(
    (code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`)
  );
  if (hasLocale) {
    return NextResponse.next();
  }

  // Try getting locale from cookie
  const localeFromCookie = request.cookies.get('locale')?.value;
  const matchedLocale = SUPPORTED_LOCALE_CODES.includes(localeFromCookie ?? '')
    ? localeFromCookie
    : 'en'; // fallback

  const url = request.nextUrl.clone();
  url.pathname = `/${matchedLocale}${pathname}`;

  return NextResponse.redirect(url);
}
