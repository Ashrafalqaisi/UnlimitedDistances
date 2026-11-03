import { NextResponse, type NextRequest } from 'next/server';
// Import i18n directly: the module index pulls in React components the edge runtime doesn't need
import { defaultLocale, isLocale } from '@/modules/common/i18n';

// Sends locale-less paths (for example "/" or "/events") to the default locale.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1] ?? '';

  if (!isLocale(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes, and files with extensions (images, fonts, etc.)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
