"use client";

import * as React from "react";
import { ChartInfo } from "./components/ChartInfo";
import { BarInfo } from "./components/BarInfo";
import { formatRupiah } from "@/lib/formatRupiah";

const PageHomeDashboard = () => {
	const [infoDataPesanan, setInfoDataPesanan] = React.useState([]);
	const [percentageChange, setPercentageChange] = React.useState({
		orders: 0,
		revenue: 0,
		activeTables: 0,
	});

	const fetchData = async () => {
		const response = await fetch("http://localhost:8000/api/pesanan");
		const data = await response.json();
		setInfoDataPesanan(data.data);
		calculatePercentageChange(data.data);
	};

	const calculatePercentageChange = (data) => {
		const currentMonth = new Date().getMonth();
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

		const currentMonthData = data.filter(
			(order) => new Date(order.tanggal).getMonth() === currentMonth
		);
		const previousMonthData = data.filter(
			(order) => new Date(order.tanggal).getMonth() === previousMonth
		);

		const currentMonthOrders = currentMonthData.length;
		const previousMonthOrders = previousMonthData.length;

		const currentMonthRevenue = currentMonthData.reduce(
			(acc, order) => acc + order.total,
			0
		);
		const previousMonthRevenue = previousMonthData.reduce(
			(acc, order) => acc + order.total,
			0
		);

		const currentMonthActiveTables = new Set(
			currentMonthData.map((order) => order.id_meja)
		).size;
		const previousMonthActiveTables = new Set(
			previousMonthData.map((order) => order.id_meja)
		).size;

		setPercentageChange({
			orders:
				((currentMonthOrders - previousMonthOrders) / previousMonthOrders) *
				100,
			revenue:
				((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
				100,
			activeTables:
				((currentMonthActiveTables - previousMonthActiveTables) /
					previousMonthActiveTables) *
				100,
		});
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const menuCounts = {};
	infoDataPesanan.forEach((order) => {
		order.item_pesanan.forEach((item) => {
			const menuName = item.menu.nama_menu;
			menuCounts[menuName] = (menuCounts[menuName] || 0) + item.jumlah;
		});
	});

	return (
		<>
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Order</p>
					<p className="text-3xl font-bold">{infoDataPesanan.length}</p>
					<p className="text-sm text-gray-400">
						{percentageChange.orders.toFixed(1)}% from last month
					</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Pendapatan</p>
					<p className="text-3xl font-bold">
						{formatRupiah(
							infoDataPesanan.reduce((acc, order) => acc + order.total, 0)
						)}
					</p>
					<p className="text-sm text-gray-400">
						{percentageChange.revenue.toFixed(1)}% from last month
					</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Meja Aktif</p>
					<p className="text-3xl font-bold">
						{new Set(infoDataPesanan.map((order) => order.id_meja)).size}
					</p>
					<p className="text-sm text-gray-400">
						{percentageChange.activeTables.toFixed(1)}% from last month
					</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Menu Terlaris</p>
					<p className="text-3xl font-bold">
						{Object.entries(menuCounts)
							.sort((a, b) => b[1] - a[1])[0]?.[0]
							?.split(" ")
							.slice(0, 2)
							.join(" ")}
					</p>
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<ChartInfo orders={infoDataPesanan} />
				<BarInfo orders={infoDataPesanan} />
			</div>
		</>
	);
};

export default PageHomeDashboard;
