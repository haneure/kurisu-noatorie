import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getLocaleAvailability, SUPPORTED_LOCALES } from "./lib/metadata/i18n";
import { cookies } from "next/headers"

const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map(locale => locale.code);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the client's IP address
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

  // You can use the IP address for analytics or rate limiting
  // For this example, we're just logging it
  console.log(`Request from IP: ${ip}`)

  // Already has locale prefix, no redirect needed
  const pathnameIsMissingLocale = SUPPORTED_LOCALE_CODES.every(
    (localeCode) => !pathname.startsWith(`/${localeCode}`)
  )

  if (pathnameIsMissingLocale) {
    // Get from cookie or fallback to 'en'
    const cookieLocale = request.cookies.get("MYNEXTAPP_LOCALE")?.value
    console.log("📦 Cookie locale:", cookieLocale)

    const detectedLocale = getLocaleAvailability(cookieLocale ?? 'en');

    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = `/${detectedLocale}${pathname}`;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}
