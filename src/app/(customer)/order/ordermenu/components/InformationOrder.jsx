import { Separator } from "@/components/ui/separator";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const InformationOrder = ({ name, typeOrder }) => {
	return (
		<div className="flex flex-col bg-white m-4 rounded-lg border">
			<div className="flex justify-between items-center p-4">
				<div className="flex flex-col gap-1">
					<p className="font-semibold text-base">{name}</p>
					<p className="text-sm text-gray-400">Open Today, 08:00-23:00</p>
				</div>
				<a href="operasional">
					<IoIosArrowForward />
				</a>
			</div>

			<Separator />
			<div className="flex justify-between items-center p-4">
				<p className="text-sm">Order Type</p>
				<p className="text-xs font-medium px-2 py-1 border rounded-md">
					{typeOrder}
				</p>
			</div>
		</div>
	);
};

export default InformationOrder;
