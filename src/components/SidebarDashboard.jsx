"use client";

import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const SidebarDashboard = ({ children, data, header }) => {
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		const tokenUser = Cookies.get("auth_session");
		if (tokenUser) {
			const decodedToken = JSON.parse(atob(tokenUser.split(".")[1]));
			setUser(decodedToken);
		}
	}, []);

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
			<SidebarInset>
				{header}
				{children}
			</SidebarInset>
		</>
	);
};

export default SidebarDashboard;
