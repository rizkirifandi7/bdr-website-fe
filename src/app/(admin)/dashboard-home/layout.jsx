import React, { Fragment } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";
import SidebarDashboardHeader from "@/components/DashboardHeaderBeranda";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";

export const metadata = {
	title: "Dashboard Home | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

const data = {
	navMain: [
		{
			title: "Kelola Dashboard",
			url: "#",
			items: [
				{
					title: "Reservasi",
					url: "/dashboard-home/reservasi",
					icon: <MdOutlineSpaceDashboard />,
				},
				{ title: "Menu", url: "/dashboard-home/menu", icon: <BiFoodMenu /> },
				{
					title: "Feedback",
					url: "/dashboard-home/feedback",
					icon: <MdOutlineSpaceDashboard />,
				},
			],
		},
	],
};

const LayoutDashboardHome = ({ children }) => {
	return (
		<Fragment>
			<SidebarProvider>
				<SidebarDashboard data={data}>
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
