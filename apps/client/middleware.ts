import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/create-organization(.*)', '/api/clerk/(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { userId, orgId } = await auth();

  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (userId && !orgId && !request.nextUrl.pathname.startsWith('/create-organization')) {
    return NextResponse.redirect(new URL('/create-organization', request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
