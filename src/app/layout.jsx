import { Toaster } from "sonner";
import "./globals.css";
import { NotificationProvider } from "@/hooks/NotifcationContext";

export const metadata = {
	title: "Homepage | Bakso Dono Reborn",
	description: "Homepage | Bakso Dono Reborn",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NotificationProvider>
					<Toaster position="top-center" />
					{children}
				</NotificationProvider>
			</body>
		</html>
	);
}

