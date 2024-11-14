"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Fungsi untuk memformat data pesanan
const formatOrderData = (orders) => {
	// Mengelompokkan pesanan berdasarkan jam
	const hourlyOrders = orders.reduce((acc, order) => {
		const hour = new Date(order.order_time).getHours();
		if (!acc[hour]) {
			acc[hour] = {
				hour: `${hour}:00`,
				jumlahPesanan: 0,
				totalPendapatan: 0,
			};
		}
		acc[hour].jumlahPesanan += 1;
		acc[hour].totalPendapatan += order.total;
		return acc;
	}, {});

	// Mengubah object menjadi array dan mengurutkan berdasarkan jam
	return Object.values(hourlyOrders).sort(
		(a, b) => parseInt(a.hour) - parseInt(b.hour)
	);
};

// Konfigurasi chart
const chartConfig = {
	jumlahPesanan: {
		label: "Jumlah Pesanan",
		color: "hsl(var(--chart-1))",
	},
	totalPendapatan: {
		label: "Total Pendapatan (Rp)",
		color: "hsl(var(--chart-2))",
	},
};

export function ChartInfo({ orders }) {
	const chartData = formatOrderData(orders);

	// Menghitung persentase perubahan
	const calculateGrowth = () => {
		if (chartData.length < 2) return 0;
		const latestHour = chartData[chartData.length - 1];
		const previousHour = chartData[chartData.length - 2];
		const growth =
			((latestHour.jumlahPesanan - previousHour.jumlahPesanan) /
				previousHour.jumlahPesanan) *
			100;
		return growth.toFixed(1);
	};

	const growth = calculateGrowth();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Grafik Pesanan Hari Ini</CardTitle>
				<CardDescription>
					{new Date().toLocaleDateString("id-ID", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="hour"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Line
							dataKey="jumlahPesanan"
							type="natural"
							stroke="hsl(var(--chart-1))"
							strokeWidth={2}
							dot={{
								fill: "hsl(var(--chart-1))",
							}}
							activeDot={{
								r: 6,
							}}
						>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					{growth > 0 ? "Meningkat" : "Menurun"} sebesar {Math.abs(growth)}%
					dari jam sebelumnya{" "}
					<TrendingUp className={`h-4 w-4 ${growth < 0 ? "rotate-180" : ""}`} />
				</div>
				<div className="leading-none text-muted-foreground">
					Menampilkan jumlah pesanan per jam
				</div>
			</CardFooter>
		</Card>
	);
}
