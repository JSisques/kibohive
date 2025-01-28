import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Si el usuario está autenticado y trata de acceder a /login o /, redirigir a /dashboard
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// Configurar qué rutas deben estar protegidas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api/auth/* (rutas de NextAuth)
     * 2. /login (página de inicio de sesión)
     * 3. / (página de inicio)
     * 4. /_next/* (archivos estáticos de Next.js)
     * 5. /favicon.ico, /sitemap.xml, etc.
     */
    '/((?!api|login|_next/static|_next/image|favicon.ico|$).*)',
  ],
};
