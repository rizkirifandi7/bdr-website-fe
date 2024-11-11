import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";
import { Toaster } from "sonner";

const LayoutAdmin = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Toaster position="top-center" />
				<SidebarProvider>
					<SidebarDashboard>{children}</SidebarDashboard>
				</SidebarProvider>
			</body>
		</html>
	);
};

export default LayoutAdmin;
