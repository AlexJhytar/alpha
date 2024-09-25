import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from '@/config';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(en|ua)/:path*', '/((?!api|_next|.*\\..*).*)']
};