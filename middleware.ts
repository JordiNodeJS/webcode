import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Añadir cabecera X-Robots-Tag para rutas de políticas y cookies
  if (
    pathname.startsWith("/cookies") ||
    pathname.startsWith("/politica-privacidad") ||
    pathname.startsWith("/privacy")
  ) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cookies/:path*", "/politica-privacidad/:path*", "/privacy/:path*"]
};
