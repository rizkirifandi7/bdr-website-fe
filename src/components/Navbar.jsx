"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "../assets/logobdr.png";
import Link from "next/link";
import { Menu } from "lucide-react";


import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

const NavLink = ({ link, activeLink, setActiveLink }) => {
	return (
		<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 text-sm uppercase text-white">
			{link.map((item, index) => (
				<li key={index}>
					<Link
						href={item.url}
						className={
							activeLink === item.title
								? `block py-2 px-3 rounded md:p-0 font-bold text-headingText`
								: `block py-2 px-3 rounded md:p-0 hover:text-headingText`
						}
						onClick={() => setActiveLink(item.title)}
					>
						{item.title}
					</Link>
				</li>
			))}
		</ul>
	);
};

const NavMenu = [
	{ title: "Beranda", url: "home" },
	{ title: "Menu", url: "menu" },
	{ title: "Layanan", url: "layanan" },
	{ title: "Tentang", url: "tentang" },
	{ title: "Reservasi", url: "reservasi" },
	{ title: "Kontak", url: "kontak" },
	{ title: "Feedback", url: "feedback" },
];

const Navbar = () => {
	const [activeLink, setActiveLink] = useState("Beranda");

	return (
		<nav className="fixed w-full bg-[#0F172B] z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					href="/beranda"
					className="flex items-center space-x-2 rtl:space-x-reverse"
				>
					<Image
						src="/logobdr.png"
						width={32}
						height={32}
						alt="Dmiehan Logo"
					/>
					<p className="self-center text-xl font-bold whitespace-nowrap text-white">
						BDR
					</p>
				</Link>

				<DropdownMenu className="w-full">
					<DropdownMenuTrigger asChild>
						<Button size="icon" className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center bg-[#0F172B] text-white border">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-3 w-[430px] border-none shadow-none rounded-none bg-[#0F172B] text-white">
						{NavMenu.map((item, index) => (
							<DropdownMenuItem key={index}>
								<Link href={item.url} className="text-base ">{item.title}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>


				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<NavLink
						link={NavMenu}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;