"use client";

import OrderSection from "@/components/OrderSection";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderSummary from "../../checkout/components/OrderSummary";
import Image from "next/image";
import { formatRupiah } from "@/lib/formatRupiah";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TambahFeedback from "./components/TambahFeedback";

const PageOrderDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState([]);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/pesanan/code-payment/${id}`
				);
				const data = await response.json();
				setOrder(data.data);
			} catch (error) {
				console.error("Error fetching order:", error);
			}
		};

		fetchOrder();
	}, [id]);

	return (
		<OrderSection>
			<div className="min-h-screen  relative overflow-y-auto scrollbar-hide pb-24 pt-16">
				<div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-between items-center bg-white h-[60px] p-4 border-b">
					<div className=""></div>
					<h1 className="text-xl font-bold">Order Summary</h1>
					<div className=""></div>
				</div>

				<div className="flex justify-between items-center gap-2 m-4 px-4 py-2 rounded-lg border border-headingText bg-orange-50">
					<p className="text-base font-medium">Order Status</p>
					<Badge className="bg-white border border-headingText text-black shadow-none hover:bg-white capitalize">
						{order.status}
					</Badge>
				</div>

				<div className="m-4 bg-white p-4 border rounded-lg">
					<div className="flex justify-between items-center">
						<div className="text-start">
							<p className="text-gray-500 text-sm">Order ID</p>
							<p className="inline-flex items-center gap-1 text-sm font-medium">
								#{order.code_payment}
							</p>
						</div>
						<div className="text-end">
							<p className="text-gray-500 text-sm">Date</p>
							<p className="text-sm font-medium">
								{new Date(order.order_time).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
								,{" "}
								{new Date(order.order_time).toLocaleTimeString("id-ID", {
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
								Ordered Items ({order.item_pesanan?.length})
							</h1>
							<Badge className="bg-white border border-headingText text-black shadow-none hover:bg-white">
								{order.mode}
							</Badge>
						</div>
						<div className="border p-4 rounded-lg">
							{order.item_pesanan?.map((item, index) => (
								<div
									key={index}
									className="flex justify-between items-center gap-2"
								>
									<div className="flex items-center gap-3 w-[300px] h-[120px]">
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}/menu/view/${item.menu.gambar}`}
											width={80}
											height={80}
											alt="menu"
											className="rounded-md"
										/>
										<div className="flex flex-col justify-between gap-1">
											<h1 className="font-semibold xs:text-sm md:text-base">
												{item.menu.nama_menu}
											</h1>
											<p className="xs:text-xs md:text-sm text-gray-500">
												{item.menu.kategori.nama_kategori}
											</p>
											<p className="xs:text-sm md:text-base">{item.jumlah}x</p>
										</div>
									</div>
									<div className="flex flex-col justify-between items-end gap-4">
										<p className="font-semibold text-base">
											{formatRupiah(item.menu.harga)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<OrderSummary
					totalPrice={order.total}
					tax={0}
					total={order.total}
					discount={0}
				/>

				<div className="flex items-center mx-4 gap-3">
					<TambahFeedback order={order} />
					<Link href={"/order/tipeorder"} className="w-full">
						<Button
							variant="outline"
							className="w-full py-6 bg-orange-400 text-white"
						>
							New Order
						</Button>
					</Link>
				</div>
			</div>
		</OrderSection>
	);
};

export default PageOrderDetail;
