import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	console.log("Route Middleware", req.nextUrl.pathname);
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
