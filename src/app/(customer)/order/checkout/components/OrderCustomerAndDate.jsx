import React from "react";

const OrderCustomerAndDate = ({ name }) => {
	return (
		<div className="m-4 bg-white p-4 border rounded-lg">
			<div className="flex justify-between items-center">
				<div className="text-start">
					<p className="text-gray-500 text-sm">Customer</p>
					<p className="inline-flex items-center gap-1 text-base font-semibold">
						{name}
					</p>
				</div>
				<div className="text-end">
					<p className="text-gray-500 text-sm">Date</p>
					<p className="text-base font-medium">
						{new Date().toLocaleDateString("id-ID", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
						,{" "}
						{new Date().toLocaleTimeString("id-ID", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderCustomerAndDate;
