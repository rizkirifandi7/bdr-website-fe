import * as React from "react";

const DashboardCard = ({ title, value, percentageChange }) => {
	return (
		<div className="flex flex-col justify-center items-start w-full h-[150px] gap-1 p-6 rounded-xl border">
			<p className="text-lg text-gray-500 mb-2">{title}</p>
			<p className="text-3xl font-bold">{value}</p>
			{percentageChange !== undefined && (
				<p className="text-sm text-gray-400">
					{percentageChange.toFixed(1)}% from last month
				</p>
			)}
		</div>
	);
};

export default DashboardCard;
