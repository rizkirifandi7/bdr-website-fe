"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaQrcode } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { ImSpoonKnife } from "react-icons/im";
import { useCart } from "@/hooks/CartContext";

const PageOperasional = () => {
	const { orderType, updateTypeOrder } = useCart();

	return (
		<section>
			<div className="max-w-[498px] mx-auto min-h-screen pb-2 bg-[#FAFAFA]">
				<div className="flex flex-col justify-center items-center hero-header h-[200px] rounded-b-md">
					<Image
						src="/logobdr.png"
						width={50}
						height={50}
						alt="logo"
						className="mb-1"
					/>
					<p className="text-xl font-bold text-headingText font-custom mb-2">
						Bakso Dono Reborn
					</p>
					<h1 className="text-3xl font-bold text-white">ORDER MENU</h1>
				</div>
				<div className="flex flex-col bg-white m-4 rounded-lg border">
					<div className="flex justify-between items-center p-4">
						<div className="flex flex-col gap-1">
							<p className="font-semibold text-base">Bakso Dono Reborn</p>
							<p className="text-xs text-gray-400">Open Today, 08:00-23:00</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center mx-4 my-10 gap-4">
					<p className="text-sm font-semibold">How to use BDR Order</p>
					<div className="flex flex-row items-center justify-center gap-2 md:gap-4">
						<div className="flex flex-col items-center gap-2 p-4 border bg-white rounded-lg w-[100px]">
							<TiShoppingCart />
							<p>Order</p>
						</div>
						<FaArrowRight />
						<div className="flex flex-col items-center gap-2 p-4 border bg-white rounded-lg w-[100px]">
							<FaQrcode />
							<p>Pay</p>
						</div>
						<FaArrowRight />
						<div className="flex flex-col items-center gap-2 p-4 border bg-white rounded-lg w-[100px]">
							<ImSpoonKnife />
							<p>Eat</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 justify-center items-center mx-4 mt-10">
					<p className="text-sm font-semibold">
						How would you line to eat today ?
					</p>
					<Link href="/order/ordermenu" className="w-full">
						<Button
							className="w-full py-6 text-sm font-semibold"
							variant="outline"
							onClick={() => updateTypeOrder("Dine In")}
						>
							Dine In
						</Button>
					</Link>

					<Link href="/order/ordermenu" className="w-full">
						<Button
							className="w-full py-6 text-sm font-semibold"
							variant="outline"
							onClick={() => updateTypeOrder("Pick Up")}
						>
							Pick Up
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default PageOperasional;
