"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

const PageKitchenList = () => {
	const [data, setData] = React.useState([]);

	const fetchDataPesanan = React.useCallback(async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/pesanan`
		);

		if (response.status !== 200) {
			toast.error("Failed to fetch data");
			return;
		}

		const reversedData = response.data.data;
		setData(reversedData);
	}, []);

	React.useEffect(() => {
		fetchDataPesanan();
	}, [fetchDataPesanan]);

	const updateOrderStatus = async (id, status) => {
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/${id}`,
				{
					status: status,
				}
			);

			if (response.status === 200) {
				setData((prevData) => prevData.filter((item) => item.id !== id));
				toast.success("Order status updated successfully");
			} else {
				toast.error("Failed to update order status");
			}
		} catch (error) {
			toast.error("Failed to update order status");
		}
	};

	const filteredData = data.filter((item) => item.status === "preparing");

	return (
		<div>
			<h1 className="text-2xl font-bold">Kitchen List Pesanan</h1>

			<div className="grid grid-cols-4 gap-6 mt-10">
				{filteredData.map((item) => (
					<Card key={item.id}>
						<div className="flex justify-between items-center p-4 border-b">
							<div className="">
								<h1 className="text-lg font-semibold">{item.nama_pelanggan}</h1>
								<p className="text-sm">
									{new Date(item.order_time).toLocaleDateString("id-ID", {
										day: "numeric",
										month: "short",
										year: "numeric",
									})}
									,
									{new Date(item.order_time).toLocaleTimeString("id-ID", {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</p>
							</div>
							<div className="text-end">
								<h1 className="text-lg font-semibold">Order #{item.id}</h1>
								<p className="text-sm">{item.mode}</p>
							</div>
						</div>
						<div className="p-4">
							{item.item_pesanan.map((subItem) => (
								<div
									className="flex justify-between items-center"
									key={subItem.id}
								>
									<p className="text-sm">{subItem.menu.nama_menu}</p>
									<p className="text-sm">x{subItem.jumlah}</p>
								</div>
							))}
						</div>
						<div className="p-4">
							<h1 className="text-base font-semibold">Catatan:</h1>
							<p className="text-sm">{item.catatan}</p>
						</div>
						<div className="flex gap-x-4 justify-between items-center p-4 border-t">
							<button
								className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
								onClick={() => updateOrderStatus(item.id, "completed")}
							>
								Completed
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
								onClick={() => updateOrderStatus(item.id, "canceled")}
							>
								Cancel
							</button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

export default PageKitchenList;
