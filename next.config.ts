import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en'
  },
  matcher: [
    '/((?!_next|favicon.ico|images|fonts|api).*)',
  ],
};

export default nextConfig;
