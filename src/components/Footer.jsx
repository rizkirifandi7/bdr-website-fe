import Image from "next/image";
import React from "react";
import Logo from "../assets/logobdr.png";
import { Facebook } from "lucide-react";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import Link from "next/link";

const FooterLink = ({ href, children }) => (
	<a href={href} className="hover:underline">
		{children}
	</a>
);

const FooterSection = ({ title, children }) => (
	<div className="w-[250px]">
		<h2 className="mb-6 text-2xl text-headingText font-custom">{title}</h2>
		<div className="flex flex-col gap-4 text-white font-medium">{children}</div>
	</div>
);

const Footer = () => {
	return (
		<footer className="bg-[#0F172B] mt-20">
			<div className="flex flex-col justify-between mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 h-[400px]">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a href="#" className="flex gap-2 items-center">
							<Image src={Logo} alt="Logo" width={40} height={40} />
							<span className="self-center text-2xl font-semibold whitespace-nowrap text-headingText">
								Bakso Dono Reborn
							</span>
						</a>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						<FooterSection title="Perusahaan">
							<FooterLink href="#">Tentang Kami</FooterLink>
							<FooterLink href="#">Kontak Kami</FooterLink>
							<FooterLink href="#">Reservasi</FooterLink>
							<FooterLink href="#">Kebijakan Privasi</FooterLink>
							<FooterLink href="#">Syarat & Ketentuan</FooterLink>
						</FooterSection>
						<FooterSection title="Kontak">
							<p>
								Jl. Belakang Pasar No.24, Sadang Serang, Kec.Coblong, Kota
								Bandung 40133 Jawa Barat.
							</p>
							<p>+62 895 6099 77877</p>
							<p>baksodonoreborn@gmail.com</p>
						</FooterSection>
						<FooterSection title="Jam Buka">
							<p>Senin - Minggu</p>
							<p>10.00 - 21.00 WIB</p>
						</FooterSection>
					</div>
				</div>
				<div className="sm:flex sm:items-center sm:justify-between border-t-2 pt-8 border-gray-700">
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2024{" "}
						<a href="#" className="hover:underline">
							Bakso Dono Reborn
						</a>
						. All Rights Reserved.
					</span>
					<div className="flex mt-4 sm:justify-center sm:mt-0">
						{[
							{
								href: "#",
								icon: <CiFacebook />,
								label: "Facebook page",
							},
							{
								href: "#",
								icon: <CiInstagram />,
								label: "Discord community",
							},
						].map((social, index) => (
							<Link
								key={index}
								href={social.href}
								className="text-gray-500 text-2xl hover:text-headingText font-custom dark:hover:text-white ms-5"
							>
								{social.icon}
								<span className="sr-only">{social.label}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
