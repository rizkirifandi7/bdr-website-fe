import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
	title: "Homepage | Bakso Dono Reborn",
	description: "Homepage | Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

