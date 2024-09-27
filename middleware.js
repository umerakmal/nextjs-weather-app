import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token');

  // If token is not present, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

// Define which paths the middleware should protect
export const config = {
  matcher: ['/((?!auth|_next|favicon.ico).*)'], // Protect everything except 'auth' routes and static assets
};
