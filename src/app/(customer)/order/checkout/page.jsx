"use client";

import ItemMenu from "@/components/ItemMenu";
import OrderSection from "@/components/OrderSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/CartContext";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import OrderSummary from "./components/OrderSummary";
import { Badge } from "@/components/ui/badge";
import { MdAdd } from "react-icons/md";
import { formatRupiah } from "@/lib/formatRupiah";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateCodePayment } from "@/lib/generateId";
import axios from "axios";
import useFcmToken from "@/hooks/useFcmToken";
import { Textarea } from "@/components/ui/textarea";

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
		setName,
		name,
	} = useCart();
	const [tokenPay, setTokenPay] = useState(null);
	const [codePayment, setCodePayment] = useState(null);
	const [note, setNote] = useState("");
	const { token } = useFcmToken();

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = getTotalPrice();
	const itemsToOrder = cart.map((item) => ({
		id_menu: item.id,
		quantity: item.quantity,
		harga: item.harga,
		nama: item.nama_menu,
	}));

	const placeOrder = useCallback(async () => {
		try {
			const codePayment = generateCodePayment();
			setCodePayment(codePayment);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/snap-token`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						code_payment: codePayment,
						total: totalPrice,
						fullname: name,
						items: itemsToOrder,
					}),
				}
			);

			if (!response.ok) {
				toast.error("Failed to place order");
				throw new Error("Failed to place order");
			}

			const data = await response.json();
			setTokenPay(data.token);
		} catch (error) {
			console.error("Error placing order:", error);
			toast.error("An error occurred while placing the order");
		}
	}, [totalPrice, name, itemsToOrder]);

	useEffect(() => {
		const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
		const script = document.createElement("script");
		script.src = midtransUrl;
		script.setAttribute("data-client-key", "SB-Mid-client-PkQyNqBpQWvcUAom");
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (tokenPay) {
			const handlePayment = async (status) => {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/pesanan`,
					{
						id_meja: tableNumber,
						mode: typeOrder,
						total: totalPrice,
						items: itemsToOrder,
						code_payment: codePayment,
						nama_pelanggan: name,
						status,
						catatan: note,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.data) {
					setTokenPay(null);
					setName("");
					setCart([]);
					setTableNumber("");
					setTypeOrder("");
					await axios.post("/api/send-notification", {
						token,
						title: "Pesanan Baru Diterima",
						message:
							typeOrder === "Dine In"
								? `dari ${name} dengan nomor meja ${tableNumber}`
								: `dari ${name} untuk dibawa pulang`,
					});
					router.push(
						`${process.env.NEXT_PUBLIC_BASE_URL}/order/order-detail/${response.data.data.code_payment}`
					);
				}
			};

			try {
				window.snap.pay(tokenPay, {
					onSuccess: () => handlePayment("preparing"),
					onPending: () => handlePayment("pending"),
					onError: () => toast.error("Payment failed"),
					onClose: () => setTokenPay(null),
				});
			} catch (err) {
				toast.error("Error");
				console.log(err);
			}
		}
	}, [
		note,
		token,
		tokenPay,
		tableNumber,
		typeOrder,
		totalPrice,
		itemsToOrder,
		codePayment,
		name,
		router,
		setCart,
		setName,
		setTableNumber,
		setTypeOrder,
	]);

	const handlePlaceOrder = async () => {
		await placeOrder();
	};

	return (
		<OrderSection>
			<div className="min-h-screen relative overflow-y-auto scrollbar-hide pb-24 pt-16">
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
						<div className="text-start">
							<p className="text-gray-500 text-sm">Customer</p>
							<p className="inline-flex items-center gap-1 text-base font-semibold">
								{name}
							</p>
						</div>
						<div className="text-end">
							<p className="text-gray-500 text-sm">Date</p>
							<p className="text-base font-medium">
								{new Date().toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
								,{" "}
								{new Date().toLocaleTimeString("id-ID", {
									hour: "2-digit",
									minute: "2-digit",
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

				<div className="bg-white m-4">
					<div className="p-4 border rounded-lg">
						<Textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							className="w-full h-[100px] p-2 border rounded"
							placeholder="Catatan..."
						/>
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
