import { NextResponse } from "next/server";
import { getCookie } from "./actions/cookies";

export async function middleware(request) {
	const token = request.cookies.get("auth_session").value;
	const typeOrder = request.cookies.get("typeOrder").value

	const { pathname } = request.nextUrl;

	if (
		!token &&
		(pathname.startsWith("/dashboard") ||
			pathname.startsWith("/dashboard-home"))
	) {
		return NextResponse.rewrite(new URL("/auth/signin", request.url));
	}

	if (!typeOrder && pathname.startsWith("/order")) {
		return NextResponse.rewrite(new URL("/order/tipeorder", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/order/:path*", "/dashboard-home/:path*"],
};
