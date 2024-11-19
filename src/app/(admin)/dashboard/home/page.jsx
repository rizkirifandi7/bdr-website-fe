"use client";

import * as React from "react";
import { ChartInfo } from "./components/ChartInfo";
import { BarInfo } from "./components/BarInfo";
import { formatRupiah } from "@/lib/formatRupiah";
import DashboardCard from "./components/DashboardCard";

const PageHomeDashboard = () => {
	const [infoDataPesanan, setInfoDataPesanan] = React.useState([]);
	const [percentageChange, setPercentageChange] = React.useState({
		orders: 0,
		revenue: 0,
		activeTables: 0,
	});

	const calculatePercentageChange = React.useCallback((data) => {
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

	const activeTablesCount = React.useMemo(() => {
		return new Set(infoDataPesanan.map((order) => order.id_meja)).size;
	}, [infoDataPesanan]);

	const topMenu = React.useMemo(() => {
		return Object.entries(menuCounts)
			.sort((a, b) => b[1] - a[1])[0]?.[0]
			?.split(" ")
			.slice(0, 2)
			.join(" ");
	}, [menuCounts]);

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan`
			);
			const data = await response.json();
			setInfoDataPesanan(data.data);
			calculatePercentageChange(data.data);
		};

		fetchData();
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
				<DashboardCard
					title="Meja Aktif"
					value={activeTablesCount}
					percentageChange={percentageChange.activeTables}
				/>
				<DashboardCard title="Menu Terlaris" value={topMenu} />
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<ChartInfo orders={infoDataPesanan} />
				<BarInfo orders={infoDataPesanan} />
			</div>
		</React.Fragment>
	);
};

export default PageHomeDashboard;
