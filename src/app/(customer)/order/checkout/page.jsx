"use client";

import OrderSection from "@/components/OrderSection";
import { useCart } from "@/hooks/CartContext";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateCodePayment } from "@/lib/generateId";
import axios from "axios";
import useFcmToken from "@/hooks/useFcmToken";
import { Textarea } from "@/components/ui/textarea";

import OrderType from "./components/OrderType";
import OrderSummary from "./components/OrderSummary";
import OrderItem from "./components/OrderItem";
import OrderCustomerAndDate from "./components/OrderCustomerAndDate";
import ButtonOrder from "./components/ButtonOrder";

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

				<OrderType typeOrder={typeOrder} />

				<OrderCustomerAndDate name={name} />

				<OrderItem cart={cart} totalQuantity={totalQuantity} />

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

			<ButtonOrder
				handlePlaceOrder={handlePlaceOrder}
				totalPrice={totalPrice}
			/>
		</OrderSection>
	);
};

export default PageCheckout;
