import { getCookie } from "./actions/cookies";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(request) {
	const authSession = await getCookie("auth_session");

	const token = jwt.decode(authSession);

	if (!token || token.role !== "admin") {
		return NextResponse.redirect("http://localhost:3000/auth/signin");
	}

	const url = request.nextUrl.clone();
	if (url.pathname.startsWith("/order")) {
		const typeOrder = request.cookies.get("typeOrder");
		if (!typeOrder) {
			url.pathname = "/mode";
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/order/:path*"],
};
