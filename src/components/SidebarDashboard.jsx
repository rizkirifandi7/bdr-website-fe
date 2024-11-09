"use client";

import * as React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";

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
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard/home",
					icon: <MdOutlineSpaceDashboard />,
				},
				{
					title: "Kelola Menu",
					url: "/dashboard/menu",
					icon: <LuMenuSquare />,
				},
				{
					title: "Pesanan",
					url: "/dashboard/pesanan",
					icon: <MdOutlineBorderAll />,
				},
				{
					title: "Meja",
					url: "/dashboard/meja",
					icon: <MdOutlineTableRestaurant />,
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
	return (
		<>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<div className="">
									<Image src={LogoBDR} className="w-10 h-10" alt="logo" />
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
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="capitalize">
								Admin
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-auto me-8">
							<DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link to="/login" onClick={() => RemoveCookies()}>
								<DropdownMenuItem>
									<LogOut />
									<span>Keluar</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</>
	);
};

export default SidebarDashboard;
