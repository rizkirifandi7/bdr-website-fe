import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/SidebarDashboard";
import { MdOutlineNoteAlt, MdOutlineSpaceDashboard } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { LuMenuSquare } from "react-icons/lu";
import DashboardHeaderOrder from "@/components/DashboardHeaderOrder";
import { Toaster } from "sonner";
import { User } from "lucide-react";
import { LuChefHat } from "react-icons/lu";
import { OrderNavData } from "@/constant/NavData";

export const metadata = {
	title: "Dashboard | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

const data = {
	navMain: [
		{
			title: "Kelola Menu",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard/home",
					icon: <MdOutlineSpaceDashboard />,
				},
				{ title: "Menu", url: "/dashboard/menu", icon: <BiFoodMenu /> },
				{
					title: "Kategori Menu",
					url: "/dashboard/kategori-menu",
					icon: <LuMenuSquare />,
				},
			],
		},
		{
			title: "Kelola Pesanan",
			url: "#",
			items: [
				{
					title: "Pesanan",
					url: "/dashboard/pesanan",
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Manajemen Pesanan",
					url: "/dashboard/kitchen-list",
					icon: <LuChefHat />,
				},
			],
		},
		{
			title: "Kelola User",
			url: "#",
			items: [
				{
					title: "User",
					url: "/dashboard/user",
					icon: <User />,
				},
			],
		},
	],
};

const LayoutAdmin = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard data={data}>
					<SidebarInset>
						<DashboardHeaderOrder />
						<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
					</SidebarInset>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutAdmin;
