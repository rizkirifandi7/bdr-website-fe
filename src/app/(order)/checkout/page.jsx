"use client";

import ItemMenu from "@/components/ItemMenu";
import OrderSection from "@/components/OrderSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import OrderSummary from "./components/OrderSummary";
import { Badge } from "@/components/ui/badge";
import { MdAdd } from "react-icons/md";
import { formatRupiah } from "@/lib/formatRupiah";
import { MdOutlineTableBar } from "react-icons/md";

const PageCheckout = () => {
	const { cart, tableNumber, typeOrder, getTotalPrice, placeOrder } = useCart();
	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = getTotalPrice();
	const tax = (5 * totalPrice) / 100;
	const total = totalPrice + tax;

	const handlePlaceOrder = async () => {
		const itemsToOrder = cart.map((item) => ({
			id_menu: item.id,
			quantity: item.quantity,
			harga: item.harga,
		}));

		await placeOrder(tableNumber, total, typeOrder, itemsToOrder);
	};

	return (
		<OrderSection>
			<div className="min-h-screen  relative overflow-y-auto scrollbar-hide pb-24 pt-16">
				<div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-between items-center bg-white h-[60px] p-4 border-b">
					<Link href="/order">
						<FaArrowLeft />
					</Link>
					<h1 className="text-xl font-bold">Checkout</h1>
					<div className=""></div>
				</div>

				<div className="flex justify-between items-center gap-2 m-4 px-4 py-2 rounded-lg border border-headingText bg-orange-50">
					<p className="text-base font-medium">Order Type</p>
					<Badge className="bg-white border border-headingText text-black shadow-none hover:bg-white">
						{typeOrder}
					</Badge>
				</div>

				<div className="m-4 bg-white p-4 border rounded-lg">
					<div className="flex justify-between items-center">
						<div className="text-start">
							<p className="text-gray-500">Table Number</p>
							<p className="inline-flex items-center gap-1 text-base font-semibold">
								<MdOutlineTableBar />
								{tableNumber}
							</p>
						</div>
						<div className="text-end">
							<p className="text-gray-500">Date</p>
							<p className="text-base font-medium">
								{new Date().toLocaleDateString("id-ID", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white m-4">
					<div className="flex flex-col p-4 rounded-lg border ">
						<div className="flex justify-between items-center mb-2">
							<h1 className="inline-flex items-center font-semibold text-lg">
								Ordered Items ({totalQuantity})
							</h1>
							<Link
								href="order"
								className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-sm bg-white text-black shadow-none border border-orange-400 hover:bg-orange-400 hover:text-white"
							>
								<MdAdd className="text-sm" />
								Add Item
							</Link>
						</div>
						<div className="flex flex-col">
							{cart.map((data, index) => (
								<ItemMenu key={index} data={data} menu={"cart"} />
							))}
						</div>
					</div>
				</div>

				<OrderSummary
					totalPrice={totalPrice}
					tax={tax}
					total={total}
					discount={0}
				/>
			</div>

			<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-center text-center">
				<div className="flex justify-between items-center w-full h-[100px] rounded-t-lg shadow-xl bg-orange-50 border-t px-4">
					<div className="text-start">
						<p className="text-base">Total Payment</p>
						<p className="font-bold text-lg">{formatRupiah(total)}</p>
					</div>
					<Link href="/order">
						<Button
							className="bg-orange-500 hover:bg-headingText text-white text-base font-semibold h-[60px] w-fit"
							onClick={handlePlaceOrder}
						>
							Process to Payment
						</Button>
					</Link>
				</div>
			</div>
		</OrderSection>
	);
};

export default PageCheckout;
