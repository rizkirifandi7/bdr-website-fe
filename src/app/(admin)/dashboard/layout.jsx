import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";

export const metadata = {
	title: "Dashboard | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

const LayoutAdmin = ({ children }) => {
	return (
		<>
			<SidebarProvider>
				<SidebarDashboard>{children}</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutAdmin;
