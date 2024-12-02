"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Logout } from "@/services/api/auth";
import { removeCookie } from "@/actions/cookies";
import Cookies from "js-cookie";

const SidebarDashboardHeader = () => {
	const [user, setUser] = React.useState(null);

	const handleLogout = async () => {
		try {
			const response = await Logout();
			if (response.status === true) {
				removeCookie("auth_session");
				window.location.href = "/auth/signin";
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

	return (
		<>
			<header className="flex justify-between shrink-0 items-center border-b px-4">
				<div className="flex items-center h-16 gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
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
			</header>
		</>
	);
};

export default SidebarDashboardHeader;
