"use client";

import * as React from "react";
import { ChartInfo } from "./components/CardInfo";
import { BarInfo } from "./components/BarInfo";

const PageHomeDashboard = () => {
	return (
		<>
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Content 1</p>
					<p className="text-4xl font-bold">123</p>
					<p className="text-sm text-gray-400">+20.1% from last month</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Content 1</p>
					<p className="text-4xl font-bold">123</p>
					<p className="text-sm text-gray-400">+20.1% from last month</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Content 1</p>
					<p className="text-4xl font-bold">123</p>
					<p className="text-sm text-gray-400">+20.1% from last month</p>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
					<p className="text-lg text-gray-500 mb-2">Content 1</p>
					<p className="text-4xl font-bold">123</p>
					<p className="text-sm text-gray-400">+20.1% from last month</p>
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<ChartInfo />
				<BarInfo />
			</div>
		</>
	);
};

export default PageHomeDashboard;
