import React from "react";
import { Badge } from "@/components/ui/badge";

const OrderType = ({ typeOrder }) => {
	return (
		<div className="flex justify-between items-center gap-2 m-4 px-4 py-2 rounded-lg border border-headingText bg-orange-50">
			<p className="text-base font-medium">Order Type</p>
			<Badge className="bg-white border border-headingText text-black shadow-none hover:bg-white">
				{typeOrder}
			</Badge>
		</div>
	);
};

export default OrderType;
