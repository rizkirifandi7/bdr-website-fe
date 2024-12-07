import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";
import DashboardHeaderOrder from "@/components/DashboardHeaderOrder";
import { Toaster } from "sonner";
import { OrderNavData } from "@/constant/NavData";

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
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard data={OrderNavData} header={<DashboardHeaderOrder />}>
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutAdmin;
