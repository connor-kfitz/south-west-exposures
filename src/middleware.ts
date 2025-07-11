import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const allowedOrigins = ['https://swexposures.com', 'https://swexposures-git-develop-connor-fitzsimmons-projects.vercel.app', 'http://localhost:3000']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/about", req.url));
  }

  if (url.pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // Check the origin from the request
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = req.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"]
}
