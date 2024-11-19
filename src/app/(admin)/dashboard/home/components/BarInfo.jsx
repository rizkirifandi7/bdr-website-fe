"use client";

import { TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

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

// Fungsi untuk mengolah data menu
const processMenuData = (orders) => {
	// Menghitung jumlah dan pendapatan per menu
	const menuStats = orders.reduce((acc, order) => {
		order.item_pesanan.forEach((item) => {
			const menuName = item.menu.nama_menu;
			if (!acc[menuName]) {
				acc[menuName] = {
					menu: menuName,
					jumlah: 0,
					pendapatan: 0,
				};
			}
			acc[menuName].jumlah += item.jumlah;
			acc[menuName].pendapatan += item.subtotal;
		});
		return acc;
	}, {});

	// Mengubah object menjadi array dan mengurutkan berdasarkan jumlah pesanan
	return Object.values(menuStats)
		.sort((a, b) => b.jumlah - a.jumlah)
		.slice(0, 6); // Mengambil 6 menu teratas
};

// Konfigurasi chart
const chartConfig = {
	jumlah: {
		label: "Jumlah Terjual",
		color: "hsl(var(--chart-1))",
	},
	pendapatan: {
		label: "Total Pendapatan",
		color: "hsl(var(--chart-2))",
	},
	label: {
		color: "hsl(var(--background))",
	},
};

export function BarInfo({ orders }) {
	const chartData = processMenuData(orders);

	// Menghitung persentase perubahan total penjualan
	const calculateGrowth = () => {
		const totalCurrent = chartData.reduce((sum, item) => sum + item.jumlah, 0);
		const previousTotal = orders.length; // Simplified previous total
		const growth = ((totalCurrent - previousTotal) / previousTotal) * 100;
		return growth.toFixed(1);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Menu Terlaris</CardTitle>
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
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="menu"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.split(" ").slice(0, 2).join(" ")} // Memendekkan nama menu
							hide
						/>
						<XAxis dataKey="jumlah" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="jumlah"
							layout="vertical"
							fill="hsl(var(--chart-1))"
							radius={4}
						>
							<LabelList
								dataKey="menu"
								position="insideLeft"
								offset={8}
								className="fill-[hsl(var(--background))]"
								fontSize={12}
								formatter={(value) => value.split(" ").slice(0, 2).join(" ")} // Memendekkan nama menu
							/>
							<LabelList
								dataKey="jumlah"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
								formatter={(value) => `${value} porsi`}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					{chartData[0]?.menu.split(" ").slice(0, 2).join(" ")} adalah menu
					terlaris dengan {chartData[0]?.jumlah} porsi
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Menampilkan 6 menu dengan penjualan tertinggi
				</div>
			</CardFooter>
		</Card>
	);
}
