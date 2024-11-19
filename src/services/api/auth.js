import axios from "axios";

export const Login = async ({ email, password }) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
			{
				email,
				password,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
};

export const Logout = async () => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`
		);
		return response.data;
	} catch (error) {
		console.error("Error logging out:", error);
		throw error;
	}
};
