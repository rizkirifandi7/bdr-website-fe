"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "../assets/logobdr.png";
import Link from "next/link";
import { Menu, X, XIcon } from "lucide-react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
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

	return (
		<nav className="bg-[#0F172B] fixed w-full z-50">
			<div className="max-w-screen-xl mx-auto w-full">
				<div className="md:flex md:justify-between items-center py-4 px-6 md:px-0">
					<div className="flex justify-between items-center ">
						<Link
							href="home"
							className="flex items-center gap-2 text-2xl font-bold"
						>
							<Image src={Logo} alt="Logo" width={40} height={40} />
							<span className="text-2xl  text-white">BDR</span>
						</Link>
						<div className="md:hidden ">
							<button onClick={toggleMenu} className="text-2xl text-[#FEA116]">
								{isOpen ? <XIcon /> : <Menu />}
							</button>
						</div>
					</div>
					<div
						className={`md:block ${isOpen ? "block" : "hidden"} mt-4 md:mt-0`}
					>
						<ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 uppercase font-bold text-lg text-white">
							{NavMenu.map((menu, index) => (
								<li key={index}>
									<a href={menu.url} className="text-sm">
										{menu.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
