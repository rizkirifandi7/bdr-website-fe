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
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

import {
	MdOutlineSpaceDashboard,
	MdOutlineTableRestaurant,
	MdOutlineNoteAlt,
	MdOutlineFeedback,
	MdOutlineBorderAll,
} from "react-icons/md";
import { LuMenuSquare, LuUser2 } from "react-icons/lu";

import LogoBDR from "../assets/logobdr.png";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { removeCookie } from "@/actions/cookies";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Logout } from "@/services/api/auth";
import { toast } from "sonner";
import { Button } from "./ui/button";

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
				{
					title: "Menu",
					url: "/dashboard/menu",
					icon: <LuMenuSquare />,
				},
				{
					title: "Kategori Menu",
					url: "/dashboard/kategori-menu",
					icon: <LuMenuSquare />,
				},

				{
					title: "Meja",
					url: "/dashboard/meja",
					icon: <MdOutlineTableRestaurant />,
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
					icon: <MdOutlineBorderAll />,
				},
				{
					title: "Reservasi",
					url: "/dashboard/reservasi",
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Feedback",
					url: "/dashboard/feedback",
					icon: <MdOutlineFeedback />,
				},
			],
		},
		{
			title: "User",
			url: "#",
			items: [
				{
					title: "User",
					url: "/dashboard/user",
					icon: <LuUser2 />,
				},
			],
		},
	],
};

const SidebarDashboard = ({ children }) => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const response = await Logout();

			if (response.status === true) {
				removeCookie("auth_session");
				router.push("/auth/signin");
				toast.success("Logout berhasil.");
			}
		} catch (error) {
			toast.error("Logout gagal.");
			console.error("Error logging out:", error);
		}
	};

	return (
		<>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<div className="">
									<Image
										src={LogoBDR}
										className="w-10 h-10"
										alt="logo"
									/>
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-bold text-sm">Bakso Dono Reborn</span>
									<span className="">Sistem Informasi</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent className="px-3">
					{data.navMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="flex flex-col gap-4">
									{item.items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild isActive={item.isActive}>
												<Link href={item.url}>
													<p className="text-2xl">{item.icon}</p>
													<p className="text-base font-medium">{item.title}</p>
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
				<header className="flex justify-between shrink-0 items-center border-b px-4">
					<div className="flex items-center h-16 gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<p className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-base font-medium">
								<FaRegUser />
								Admin
							</p>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-auto me-5">
							<DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Button variant="outline" href="/auth/signin" onClick={() => handleLogout()}>
								<DropdownMenuItem>
									<LogOut />
									<span>Keluar</span>
								</DropdownMenuItem>
							</Button>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</>
	);
};

export default SidebarDashboard;
