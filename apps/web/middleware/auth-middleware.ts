import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Manejamos la autorización en el middleware
    },
  },
);

// Configurar qué rutas deben estar protegidas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api/auth/* (rutas de NextAuth)
     * 2. /_next/* (archivos estáticos de Next.js)
     * 3. /favicon.ico, /sitemap.xml, etc.
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
