"use client";

import OrderSection from "@/components/OrderSection";
import { useCart } from "@/hooks/CartContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PageCheckout = () => {
	const router = useRouter();
	const {
		cart,
		typeOrder,
		getTotalPrice,
		setCart,
		setTypeOrder,
		setName,
		name,
	} = useCart();
	const [codePayment, setCodePayment] = useState(null);
	const [note, setNote] = useState("");
	const [tipePayment, setTipePayment] = useState("Cash");
	const { token } = useFcmToken();

	useEffect(() => {
		const paymentCode = generateCodePayment();
		setCodePayment(paymentCode);
	}, []);

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = getTotalPrice();
	const itemsToOrder = cart.map((item) => ({
		id_menu: item.id,
		quantity: item.quantity,
		harga: item.harga,
		nama: item.nama_menu,
	}));

	const handlePaymentChange = (value) => {
		setTipePayment(value);
	};

	const handlePayment = async () => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/pesanan`,
			{
				tipe_payment: tipePayment,
				mode: typeOrder,
				total: totalPrice,
				items: itemsToOrder,
				code_payment: codePayment,
				nama_pelanggan: name,
				status: "pending",
				catatan: note,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.data) {
			setName("");
			setCart([]);
			setTypeOrder("");
			await axios.post("/api/send-notification", {
				token,
				title: "Pesanan Baru Diterima",
				message:
					typeOrder === "Dine In"
						? `dari ${name}`
						: `dari ${name} untuk dibawa pulang`,
			});
			router.push(
				`${process.env.NEXT_PUBLIC_BASE_URL}/order/order-detail/${response.data.data.code_payment}`
			);
		}
	};

	const handlePlaceOrder = async () => {
		await handlePayment();
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

				<div className="bg-white m-4">
					<div className="p-4 border rounded-lg">
						<h1 className="font-semibold text-base mb-2">Payment Method</h1>
						<RadioGroup value={tipePayment} onValueChange={handlePaymentChange}>
							<div className="flex justify-between items-center hover:bg-slate-100 rounded-lg py-0.5 w-full">
								<label
									htmlFor="r1"
									className="flex justify-between items-center w-full cursor-pointer"
								>
									<span className="text-base">Cash</span>
									<RadioGroupItem value="cash" id="r1" className="w-6 h-6" />
								</label>
							</div>
							<div className="flex justify-between items-center hover:bg-slate-100 rounded-lg py-0.5 w-full">
								<label
									htmlFor="r2"
									className="flex justify-between items-center w-full cursor-pointer"
								>
									<span className="text-base">Transfer</span>
									<RadioGroupItem
										value="transfer"
										id="r2"
										className="w-6 h-6"
									/>
								</label>
							</div>
						</RadioGroup>
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
