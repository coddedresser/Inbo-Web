// import { NextRequest, NextResponse } from 'next/server';

// // Protected routes that require authentication
// const protectedRoutes = ['/dashboard', '/profile', '/settings'];
// const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];

// // Public routes that don't require authentication
// const publicRoutes = ['/about', '/contact'];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('access_token')?.value;

//   // Check if route is protected
//   const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

//   // Redirect root path to login if not authenticated
//   if (pathname === '/' && !token) {
//     return NextResponse.redirect(new URL('/auth/login', request.url));
//   }

//   // Redirect root path to dashboard if authenticated
//   if (pathname === '/' && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // Redirect to login if accessing protected route without token
//   if (isProtectedRoute && !token) {
//     const loginUrl = new URL('/auth/login', request.url);
//     loginUrl.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Redirect to dashboard if accessing auth routes while authenticated
//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // Add security headers
//   const response = NextResponse.next();

//   // Security headers
//   response.headers.set('X-Frame-Options', 'DENY');
//   response.headers.set('X-Content-Type-Options', 'nosniff');
//   response.headers.set('X-XSS-Protection', '1; mode=block');
//   response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

//   // CORS headers for API routes
//   if (pathname.startsWith('/api')) {
//     response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*');
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   }

//   return response;
// }

// // Configure which routes to run middleware on
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };















import { NextRequest, NextResponse } from 'next/server';

// Protected routes that require authentication
// const protectedRoutes = ['/dashboard', '/profile', '/settings'];
// const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];

// Public routes
// const publicRoutes = ['/about', '/contact'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const token = request.cookies.get('access_token')?.value;

  // -------------------------------
  // ❌ COMMENT OUT ALL AUTH REDIRECTS
  // -------------------------------

  // // Redirect root path to login if not authenticated
  // if (pathname === '/' && !token) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  // // Redirect root path to dashboard if authenticated
  // if (pathname === '/' && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // // Redirect to login if accessing protected route without token
  // const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  // if (isProtectedRoute && !token) {
  //   const loginUrl = new URL('/auth/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Redirect to dashboard if accessing auth routes while authenticated
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // -------------------------------
  // ✅ Allow all routes normally
  // -------------------------------

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS for /api (optional)
  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

// Run on all routes except static files
export const config = {
  matcher: [
    
  ],
};
