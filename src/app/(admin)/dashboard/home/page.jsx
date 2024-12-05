"use client";

import * as React from "react";
import { ChartInfo } from "./components/ChartInfo";
import { BarInfo } from "./components/BarInfo";
import { formatRupiah } from "@/lib/formatRupiah";
import DashboardCard from "./components/DashboardCard";

const PageHomeDashboard = () => {
	const [data, setData] = React.useState({
		infoDataPesanan: [],
		menuData: [],
	});
	const [percentageChange, setPercentageChange] = React.useState({
		orders: 0,
		revenue: 0,
		activeTables: 0,
	});
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	const calculatePercentageChange = React.useCallback((data) => {
		const currentMonth = new Date().getMonth();
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

		const getMonthlyData = (month) =>
			data.filter((order) => new Date(order.order_time).getMonth() === month);

		const currentMonthData = getMonthlyData(currentMonth);
		const previousMonthData = getMonthlyData(previousMonth);

		const calculateChange = (current, previous) =>
			previous === 0 ? 0 : ((current - previous) / previous) * 100;

		setPercentageChange({
			orders: calculateChange(
				currentMonthData.length,
				previousMonthData.length
			),
			revenue: calculateChange(
				currentMonthData.reduce((acc, order) => acc + order.total, 0),
				previousMonthData.reduce((acc, order) => acc + order.total, 0)
			),
			activeTables: calculateChange(
				new Set(currentMonthData.map((order) => order.id_meja)).size,
				new Set(previousMonthData.map((order) => order.id_meja)).size
			),
		});
	}, []);

	const totalRevenue = React.useMemo(
		() => data.infoDataPesanan.reduce((acc, order) => acc + order.total, 0),
		[data.infoDataPesanan]
	);

	const totalRevenueToday = React.useMemo(() => {
		const today = new Date();
		return data.infoDataPesanan
			.filter((order) => {
				const orderDate = new Date(order.order_time);
				return (
					orderDate.getDate() === today.getDate() &&
					orderDate.getMonth() === today.getMonth() &&
					orderDate.getFullYear() === today.getFullYear()
				);
			})
			.reduce((acc, order) => acc + order.total, 0);
	}, [data.infoDataPesanan]);

	const totalReservations = data.menuData.length;

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const [pesananResponse, menuResponse] = await Promise.all([
					fetch(`${process.env.NEXT_PUBLIC_API_URL}/pesanan`),
					fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`),
				]);

				const pesananData = await pesananResponse.json();
				const menuData = await menuResponse.json();

				setData({
					infoDataPesanan: pesananData.data,
					menuData: menuData.data,
				});
				calculatePercentageChange(pesananData.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [calculatePercentageChange]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<React.Fragment>
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				<DashboardCard
					title="Order"
					value={data.infoDataPesanan.length}
					percentageChange={percentageChange.orders}
				/>
				<DashboardCard
					title="Pendapatan"
					value={formatRupiah(totalRevenue)}
					percentageChange={percentageChange.revenue}
				/>
				<DashboardCard title="Menu" value={totalReservations} />
				<DashboardCard
					title="Pendapatan Hari Ini"
					value={formatRupiah(totalRevenueToday)}
				/>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<ChartInfo orders={data.infoDataPesanan} />
				<BarInfo orders={data.infoDataPesanan} />
			</div>
		</React.Fragment>
	);
};

export default PageHomeDashboard;
