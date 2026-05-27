import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/register';
  const isDashboardPage = request.nextUrl.pathname === '/dashboard';
  
  // Por enquanto, usamos localStorage no cliente
  // O middleware não tem acesso ao localStorage
  // Vamos permitir acesso e proteger no componente
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
