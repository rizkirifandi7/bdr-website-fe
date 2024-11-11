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
			<div className="sm:w-[225px] h-full bg-white rounded-lg border">
				<Link
					href={`#`}
					className="flex flex-col justify-center items-center p-3 sm:p-4"
				>
					<Image
						src={`http://localhost:8000/api/menu/view/${data.gambar}`}
						alt={data.nama_menu}
						width={197}
						height={170}
						className="w-full h-[150px] sm:h-[170px] object-cover bg-center rounded-lg"
					/>
					<h3 className="font-semibold text-sm sm:text-base w-[170px] px-2 mt-3 truncate text-center">
						{data.nama_menu}
					</h3>
					<p className="text-sm text-gray-500 truncate">{data.kategori}</p>
				</Link>
				<div className="flex justify-between items-center mx-2 sm:mx-3 mb-2 sm:mb-3 px-2 py-1.5 bg-gray-50  rounded-lg">
					<p className="font-semibold sm:text-base text-sm">
						{formatRupiah(data.harga)}
					</p>
					<div className="flex items-center gap-1">
						{cartItem && cartItem.quantity > 0 && (
							<>
								<Button
									variant="secondary"
									className="rounded-lg border h-8 w-8 bg-white hover:bg-headingText hover:text-white"
									onClick={() => handleRemoveFromCart(data)}
								>
									<FaMinus />
								</Button>
								<p className="text-sm font-semibold px-1">
									{cartItem.quantity}
								</p>
							</>
						)}
						<Button
							variant="secondary"
							className="rounded-lg border h-8 w-8 bg-white hover:bg-headingText hover:text-white"
							onClick={() => handleAddToCart(data)}
						>
							<FaPlus />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuOrder;
