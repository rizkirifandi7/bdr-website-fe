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
							<li>
								<Link href="home" className="text-sm">
									Beranda
								</Link>
							</li>
							<li>
								<Link href="menu" className="text-sm">
									Menu
								</Link>
							</li>
							<li>
								<Link href="layanan" className="text-sm">
									Layanan
								</Link>
							</li>
							<li>
								<Link href="tentang" className="text-sm">
									Tentang
								</Link>
							</li>
							<li>
								<Link href="reservasi" className="text-sm">
									Reservasi
								</Link>
							</li>
							<li>
								<Link href="kontak" className="text-sm">
									Kontak
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
