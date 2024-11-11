"use client";

import OrderSection from "@/components/OrderSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { FaArrowLeft, FaPlus } from "react-icons/fa6";

const PageDetailMenu = () => {
	const { id } = useParams();

	return (
		<OrderSection className="bg-white">
			<div className="flex flex-col min-h-screen w-full">
				<div className="flex justify-between items-center p-4 bg-white border-b-2 w-full">
					<Link href="/order" className="p-2 rounded-md bg-white">
						<FaArrowLeft />
					</Link>
					<h1 className="text-xl font-bold">Detail Menu</h1>
					<div className=""></div>
				</div>

				<div className="w-full px-4 bg-white">
					<Image
						src="/baso1.jpg"
						width={300}
						height={300}
						alt="details menu"
						className="w-full h-[400px] mt-4 bg-cover object-cover rounded-lg"
					/>
				</div>

				<div className="flex flex-col px-4 mt-4 bg-white ">
					<h1 className="text-2xl font-semibold">Bakso Super</h1>
					<p className="text-lg">Rating</p>
					<div className="flex justify-between items-center my-3">
						<p className="text-2xl font-bold">Rp15.000</p>
						<Button
							className="bg-headingText text-white"
							variant="outline"
							size="icon"
						>
							<FaPlus />
						</Button>
					</div>
					<Separator />
					<div className="flex flex-col mt-4 h-auto">
						<h1 className="font-semibold text-lg">Description</h1>
						<p className="text-gray-500 mt-3 text-base">
							Bakso Super adalah bakso yang paling super diantara bakso-bakso
							lainnya
						</p>
					</div>
				</div>
			</div>
		</OrderSection>
	);
};

export default PageDetailMenu;
