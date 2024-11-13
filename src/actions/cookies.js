"use server";

import { cookies } from "next/headers";

const setCookie = async (name, value) => {
	await cookies().set({
		name,
		value,
		httpOnly: true,
		path: "/",
	});
};

const getCookie = async (name) => {
	const cookie = await cookies().get(name);
	return cookie ? cookie.value : null;
};

const removeCookie = async (name) => {
	await cookies().set(name, null);
};

export { setCookie, removeCookie, getCookie };
