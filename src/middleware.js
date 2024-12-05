import { NextResponse } from "next/server";
import { getCookie } from "./actions/cookies";

export async function middleware(request) {
	const token = await getCookie("auth_session");
	const typeOrder = await getCookie("typeOrder");

	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/order/order-detail")) {
		return NextResponse.next();
	}

	if (!token && pathname.startsWith("/dashboard")) {
		return NextResponse.rewrite(new URL("/auth/signin", request.url));
	}

	if (!token && pathname.startsWith("/dashboard-home")) {
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