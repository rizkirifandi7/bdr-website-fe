import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatRupiah";
import React from "react";

const ButtonOrder = ({ totalPrice, handlePlaceOrder }) => {
	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[492px] w-full flex justify-center text-center">
			<div className="flex justify-between items-center w-full h-[100px] rounded-t-lg shadow-xl bg-orange-50 border-t px-4">
				<div className="text-start">
					<p className="text-base">Total Payment</p>
					<p className="font-bold text-lg">{formatRupiah(totalPrice)}</p>
				</div>
				<Button
					className="bg-orange-500 hover:bg-headingText text-white text-base font-semibold h-[60px] w-fit"
					onClick={handlePlaceOrder}
				>
					Process to Payment
				</Button>
			</div>
		</div>
	);
};

export default ButtonOrder;
