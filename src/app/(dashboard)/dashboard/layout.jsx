import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";

const LayoutAdmin = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<SidebarProvider>
					<SidebarDashboard>{children}</SidebarDashboard>
				</SidebarProvider>
			</body>
		</html>
	);
};

export default LayoutAdmin;
