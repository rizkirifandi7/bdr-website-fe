"use client";

import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatRupiah";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const MenuOrder = ({ data, addToCart, removeFromCart, cart }) => {
	const handleAddToCart = (item) => {
		addToCart(item);
	};

	const handleRemoveFromCart = (item) => {
		removeFromCart(item);
	};

	// Find the item in the cart to get its quantity
	const cartItem = cart ? cart.find((item) => item.id === data.id) : null;

	return (
		<>
			<div className="sm:w-[225px] md:w-full h-full bg-white rounded-lg border">
				<Link
					href={`/order/ordermenu/detailsmenu/${data.id}`}
					className="flex flex-col justify-center items-center p-3 sm:p-4"
				>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}/menu/view/${data.gambar}`}
						alt={data.nama_menu}
						width={197}
						height={170}
						className="h-auto w-auto object-cover bg-center rounded-lg"
					/>
					<h3 className="font-semibold text-sm sm:text-base w-[170px] px-2 mt-3 truncate text-center">
						{data.nama_menu}
					</h3>
					<p className="text-sm text-gray-500 truncate w-[170px] text-center">
						{data.deskripsi}
					</p>
				</Link>
				<div className="flex justify-between gap-1 items-center mx-2 md:mx-3 mb-2 sm:mb-3 px-2 py-1.5 bg-gray-50  rounded-lg">
					<p className="font-semibold text-sm md:text-sm">
						{formatRupiah(data.harga)}
					</p>
					<div className="flex items-center gap-1">
						{cartItem && cartItem.quantity > 0 && (
							<>
								<button
									className="flex items-center justify-center p-1 md:p-2 rounded-md border bg-white hover:bg-headingText hover:text-white"
									onClick={() => handleRemoveFromCart(data)}
								>
									<FaMinus />
								</button>
								<p className="text-sm font-semibold px-0.5 md:px-1">
									{cartItem.quantity}
								</p>
							</>
						)}
						<button
							className="flex items-center justify-center p-1 md:p-2 rounded-md border bg-white hover:bg-headingText hover:text-white"
							onClick={() => handleAddToCart(data)}
						>
							<FaPlus />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuOrder;
