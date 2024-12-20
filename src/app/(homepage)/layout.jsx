import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { Fragment } from "react";
import { Toaster } from "sonner";

export const metadata = {
	title: "Homepage | Bakso Dono Reborn",
	description: "Generated by create next app",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function HomeRoot({ children }) {
	return (
		<Fragment>
			<Toaster position="top-center" />
			<Navbar />
			{children}
			<Footer />
		</Fragment>
	);
}
