import { cn } from "@/lib/utils";
import React from "react";

const OrderSection = ({ children, className }) => {
	return (
		<section
			className={cn(
				`max-w-[498px] mx-auto h-full bg-[#FAFAFA] border-x-2`,
				className
			)}
		>
			{children}
		</section>
	);
};

export default OrderSection;
