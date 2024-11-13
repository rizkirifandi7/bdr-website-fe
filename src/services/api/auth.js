import axios from "axios";

export const Login = async ({ email, password }) => {
	try {
		const response = await axios.post("http://localhost:8000/api/auth/login", {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
};

export const Logout = async () => {
	try {
		const response = await axios.post("http://localhost:8000/api/auth/logout");
		return response.data;
	} catch (error) {
		console.error("Error logging out:", error);
		throw error;
	}
};
