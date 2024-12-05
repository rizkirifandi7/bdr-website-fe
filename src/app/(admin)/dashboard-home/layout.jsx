import React, { Fragment } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";
import SidebarDashboardHeader from "@/components/DashboardHeaderBeranda";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { HomeNavData } from "@/constant/NavData";

export const metadata = {
	title: "Dashboard Home | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

const LayoutDashboardHome = ({ children }) => {
	return (
		<Fragment>
			<SidebarProvider>
				<SidebarDashboard data={HomeNavData}>
					<SidebarInset>
						<SidebarDashboardHeader />
						<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
					</SidebarInset>
				</SidebarDashboard>
			</SidebarProvider>
		</Fragment>
	);
};

export default LayoutDashboardHome;
