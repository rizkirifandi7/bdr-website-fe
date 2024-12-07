"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import useFcmToken from "@/hooks/useFcmToken";
import Cookies from "js-cookie";
import { Logout } from "@/services/api/auth";
import { jwtDecode } from "jwt-decode";
import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import { removeCookie } from "@/actions/cookies";
import { useRouter } from "next/navigation";

const DashboardHeaderOrder = () => {
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
								🔔
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
								Keluar
							</DropdownMenuItem>
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default DashboardHeaderOrder;
