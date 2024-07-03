import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware();

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/about(.*)',
  '/reserva(.*)',
  '/admin(.*)',
  '/tipohabitacion(.*)',
  '/habitacion(.*)',
  '/huesped(.*)',
  '/pasajeros(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};