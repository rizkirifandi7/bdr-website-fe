"use client";

import OrderSection from "@/components/OrderSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/CartContext";
import { formatRupiah } from "@/lib/formatRupiah";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import ButtonCheckout from "../../components/ButtonCheckout";

const PageDetailMenu = () => {
	const { addToCart, removeFromCart, cart, getTotalPrice } = useCart();

	const { id } = useParams();
	const [menu, setMenu] = useState([]);

	console.log(menu);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`
			);
			const data = await response.json();
			setMenu(data.data);
		};

		fetchData();
	}, [id]);

	const handleAddToCart = (item) => {
		addToCart(item);
	};

	const handleRemoveFromCart = (item) => {
		removeFromCart(item);
	};

	const cartItem = cart ? cart.find((item) => item.id === menu.id) : null;
	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<OrderSection className="bg-white">
			<div className="flex flex-col min-h-screen w-full">
				<div className="flex justify-between items-center p-4 bg-white w-full">
					<Link href="/order/ordermenu" className="p-2 rounded-md bg-white">
						<FaArrowLeft />
					</Link>
					<h1 className="text-xl font-bold">Detail Menu</h1>
					<div className=""></div>
				</div>

				<div className="w-full px-4 ">
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}/menu/view/${menu.gambar}`}
						width={300}
						height={200}
						alt="details menu"
						className="w-full h-auto mt-4 bg-cover object-cover bg-gray-50 rounded-lg"
					/>
				</div>

				<div className="flex flex-col px-4 mt-4 bg-white ">
					<h1 className="text-xl md:text-2xl font-semibold">
						{menu.nama_menu}
					</h1>
					<p className="text-base text-gray-400">{menu.kategori}</p>
					<div className="flex justify-between items-center my-3">
						<p className="text-2xl font-bold">{formatRupiah(menu.harga)}</p>
						<div className="flex items-center gap-1">
							{cartItem && cartItem.quantity > 0 && (
								<>
									<button
										className="flex items-center justify-center p-1 md:p-2 rounded-md border bg-white hover:bg-headingText hover:text-white"
										onClick={() => handleRemoveFromCart(menu)}
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
								onClick={() => handleAddToCart(menu)}
							>
								<FaPlus />
							</button>
						</div>
					</div>
					<Separator />
					<div className="flex flex-col mt-4 h-auto">
						<h1 className="font-semibold text-lg">Description</h1>
						<p className="text-gray-500 mt-3 text-base">{menu.deskripsi}</p>
					</div>
				</div>
			</div>

			{totalQuantity > 0 && (
				<ButtonCheckout
					link={"/order/checkout"}
					totalQuantity={totalQuantity}
					getTotalPrice={getTotalPrice}
				/>
			)}
		</OrderSection>
	);
};

export default PageDetailMenu;
