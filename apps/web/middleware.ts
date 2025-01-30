import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');

  // Añadir el pathname a los headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  if (isAuthPage) {
    return token
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next({
          request: { headers: requestHeaders },
        });
  }

  return token
    ? NextResponse.next({
        request: { headers: requestHeaders },
      })
    : NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
