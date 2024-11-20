"use client";

import * as React from "react";
import { ChartInfo } from "./components/ChartInfo";
import { BarInfo } from "./components/BarInfo";
import { formatRupiah } from "@/lib/formatRupiah";
import DashboardCard from "./components/DashboardCard";

const PageHomeDashboard = () => {
	const [infoDataPesanan, setInfoDataPesanan] = React.useState([]);
	const [reservasiData, setReservasiData] = React.useState([]);
	const [percentageChange, setPercentageChange] = React.useState({
		orders: 0,
		revenue: 0,
		activeTables: 0,
	});

	const calculatePercentageChange = React.useCallback((data) => {
		const currentMonth = new Date().getMonth();
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

		const currentMonthData = data.filter(
			(order) => new Date(order.order_time).getMonth() === currentMonth
		);
		const previousMonthData = data.filter(
			(order) => new Date(order.order_time).getMonth() === previousMonth
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
	}, []);

	const menuCounts = React.useMemo(() => {
		const counts = {};
		infoDataPesanan.forEach((order) => {
			order.item_pesanan.forEach((item) => {
				const menuName = item.menu.nama_menu;
				counts[menuName] = (counts[menuName] || 0) + item.jumlah;
			});
		});
		return counts;
	}, [infoDataPesanan]);

	const totalRevenue = React.useMemo(() => {
		return infoDataPesanan.reduce((acc, order) => acc + order.total, 0);
	}, [infoDataPesanan]);

	const totalRevenueToday = React.useMemo(() => {
		const today = new Date();
		return infoDataPesanan
			.filter((order) => {
				const orderDate = new Date(order.order_time);
				return (
					orderDate.getDate() === today.getDate() &&
					orderDate.getMonth() === today.getMonth() &&
					orderDate.getFullYear() === today.getFullYear()
				);
			})
			.reduce((acc, order) => acc + order.total, 0);
	}, [infoDataPesanan]);

	const totalReservations = reservasiData.length;

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan`
			);
			const data = await response.json();
			setInfoDataPesanan(data.data);
			calculatePercentageChange(data.data);
		};

		const fetchDataReservasi = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/reservasi`
			);
			const data = await response.json();
			setReservasiData(data.data);
		};

		fetchData();
		fetchDataReservasi();
	}, [calculatePercentageChange]);

	return (
		<React.Fragment>
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				<DashboardCard
					title="Order"
					value={infoDataPesanan.length}
					percentageChange={percentageChange.orders}
				/>
				<DashboardCard
					title="Pendapatan"
					value={formatRupiah(totalRevenue)}
					percentageChange={percentageChange.revenue}
				/>
				<DashboardCard title="Reservasi" value={totalReservations} />
				<DashboardCard
					title="Pendapatan Hari Ini"
					value={formatRupiah(totalRevenueToday)}
				/>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<ChartInfo orders={infoDataPesanan} />
				<BarInfo orders={infoDataPesanan} />
			</div>
		</React.Fragment>
	);
};

export default PageHomeDashboard;
