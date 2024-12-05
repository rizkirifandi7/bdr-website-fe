"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

// const data = {
// 	navMain: [
// 		{
// 			title: "Kelola Menu",
// 			url: "#",
// 			items: [
// 				{
// 					title: "Dashboard",
// 					url: "/dashboard/home",
// 					icon: <MdOutlineSpaceDashboard />,
// 				},
// 				{ title: "Menu", url: "/dashboard/menu", icon: <BiFoodMenu /> },
// 				{
// 					title: "Kategori Menu",
// 					url: "/dashboard/kategori-menu",
// 					icon: <LuMenuSquare />,
// 				},
// 			],
// 		},
// 		{
// 			title: "Kelola Pesanan",
// 			url: "#",
// 			items: [
// 				{
// 					title: "Pesanan",
// 					url: "/dashboard/pesanan",
// 					icon: <MdOutlineNoteAlt />,
// 				},
// 				{
// 					title: "Reservasi",
// 					url: "/dashboard/reservasi",
// 					icon: <MdEventNote />,
// 				},
// 				{
// 					title: "Feedback",
// 					url: "/dashboard/feedback",
// 					icon: <MdOutlineFeedback />,
// 				},
// 			],
// 		},
// 	],
// };

const SidebarDashboard = ({ children, data }) => {
	const tokenUser = Cookies.get("auth_session");
	const user = tokenUser ? JSON.parse(atob(tokenUser.split(".")[1])) : null;

	const filteredNavMain = data.navMain.filter(
		(item) => (user && user.role === "admin") || item.title !== "Kelola User"
	);

	return (
		<>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<Image src="/logobdr.png" width={40} height={40} alt="logo" />
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-bold text-sm">Bakso Dono Reborn</span>
									<span className="">Sistem Informasi</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent className="px-3">
					{filteredNavMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="flex flex-col gap-4">
									{item.items.map((subItem) => (
										<SidebarMenuItem key={subItem.title}>
											<SidebarMenuButton asChild>
												<Link href={subItem.url}>
													<p className="text-2xl">{subItem.icon}</p>
													<p className="text-base font-medium">
														{subItem.title}
													</p>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			{children}
		</>
	);
};

export default SidebarDashboard;
