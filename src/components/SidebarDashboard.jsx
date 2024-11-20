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
	MdEventNote,
} from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";
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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Import Firebase messaging
import useFcmToken from "@/hooks/useFcmToken";

import { MdOutlineFeedback } from "react-icons/md";
import { LuMenuSquare } from "react-icons/lu";

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
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Reservasi",
					url: "/dashboard/reservasi",
					icon: <MdEventNote />,
				},
				{
					title: "Feedback",
					url: "/dashboard/feedback",
					icon: <MdOutlineFeedback />,
				},
			],
		},
	],
};

const SidebarDashboard = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = React.useState(null);
	const { token, notifications } = useFcmToken();

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

	React.useEffect(() => {
		const tokenJwt = Cookies.get("auth_session");
		if (tokenJwt) {
			setUser(jwtDecode(tokenJwt));
		}
	}, []);

	React.useEffect(() => {
		if (token) {
			const messaging = getMessaging();
			const unsubscribe = onMessage(messaging, (payload) => {
				toast.info(
					`${payload.notification.title}: ${payload.notification.body}`
				);
			});
			return () => unsubscribe();
		}
	}, [token]);

	return (
		<>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<Image src={LogoBDR} className="w-10 h-10" alt="logo" />
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
					{user && user.role === "admin" && (
						<SidebarGroup key="User ">
							<SidebarGroupLabel>User</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="flex flex-col gap-4">
									<SidebarMenuItem key="User ">
										<SidebarMenuButton asChild>
											<Link href="/dashboard/user">
												<p className="text-2xl">
													<LuUser2 />
												</p>
												<p className="text-base font-medium">User </p>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)}
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex justify-between shrink-0 items-center border-b px-4">
					<div className="flex items-center h-16 gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
					<div className="flex items-center gap-2">
						<div className="">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<p className="inline-flex items-center gap-2 px-2 py-1 border rounded-md text-base font-medium capitalize">
										<span className="text-lg">🔔</span>
									</p>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-auto me-5">
									<DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{[...notifications].reverse().map((notification, index) => (
										<DropdownMenuItem key={index}>
											<p className="text-xs">{notification.title}: </p>
											<p className="text-xs">{notification.body}</p>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<p className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-base font-medium capitalize">
									<FaRegUser />
									{user ? user.nama : "User "}
								</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-auto me-5">
								<DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<Button variant="outline" onClick={handleLogout}>
									<DropdownMenuItem>
										<LogOut />
										<span>Keluar</span>
									</DropdownMenuItem>
								</Button>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</>
	);
};

export default SidebarDashboard;
