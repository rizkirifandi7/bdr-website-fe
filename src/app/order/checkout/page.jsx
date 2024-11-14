"use client";

import ItemMenu from "@/components/ItemMenu";
import OrderSection from "@/components/OrderSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/CartContext";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import OrderSummary from "./components/OrderSummary";
import { Badge } from "@/components/ui/badge";
import { MdAdd } from "react-icons/md";
import { formatRupiah } from "@/lib/formatRupiah";
import { MdOutlineTableBar } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PageCheckout = () => {
	const router = useRouter();
	const {
		cart,
		tableNumber,
		typeOrder,
		getTotalPrice,
		setCart,
		setTableNumber,
		setTypeOrder,
	} = useCart();

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = getTotalPrice();

	const placeOrder = async () => {
		try {
			const itemsToOrder = cart.map((item) => ({
				id_menu: item.id,
				quantity: item.quantity,
				harga: item.harga,
				nama: item.nama_menu,
			}));

			const response = await fetch("http://localhost:8000/api/pesanan", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id_meja: tableNumber,
					total: totalPrice,
					mode: typeOrder,
					items: itemsToOrder,
				}),
			});

			if (!response.ok) {
				toast.error("Failed to place order");
				return;
			}

			const data = await response.json();
			const { status, message, data: orderData, token } = data;

			if (status) {
				toast.success(message);
				localStorage.removeItem("cart");
				localStorage.removeItem("tableNumber");
				localStorage.removeItem("typeOrder");
				setCart([]);
				setTableNumber("");
				setTypeOrder("");

				const redirectUrl = `https://app.sandbox.midtrans.com/snap/v4/redirection/${token}`;
				router.push(redirectUrl);
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.error("Error placing order:", error);
			toast.error("An error occurred while placing the order");
		}
	};

	const handlePlaceOrder = async () => {
		await placeOrder();
	};

	return (
		<OrderSection>
			<div className="min-h-screen  relative overflow-y-auto scrollbar-hide pb-24 pt-16">
				<div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-between items-center bg-white h-[60px] p-4 border-b">
					<Link href="/order/ordermenu">
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
						{typeOrder === "Dine In" ? (
							<div className="text-start">
								<p className="text-gray-500">Table Number</p>
								<p className="inline-flex items-center gap-1 text-base font-semibold">
									<MdOutlineTableBar />
									{tableNumber}
								</p>
							</div>
						) : (
							<div className="text-start">
								<p className="text-gray-500">Customer</p>
								<p className="inline-flex items-center gap-1 text-base font-semibold">
									{tableNumber}
								</p>
							</div>
						)}
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
								href="/order/ordermenu"
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
					tax={0}
					total={totalPrice}
					discount={0}
				/>
			</div>

			<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-center text-center">
				<div className="flex justify-between items-center w-full h-[100px] rounded-t-lg shadow-xl bg-orange-50 border-t px-4">
					<div className="text-start">
						<p className="text-base">Total Payment</p>
						<p className="font-bold text-lg">{formatRupiah(totalPrice)}</p>
					</div>
					<Button
						className="bg-orange-500 hover:bg-headingText text-white text-base font-semibold h-[60px] w-fit"
						onClick={handlePlaceOrder}
					>
						Process to Payment
					</Button>
				</div>
			</div>
		</OrderSection>
	);
};

export default PageCheckout;
