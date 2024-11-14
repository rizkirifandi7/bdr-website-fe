import { formatRupiah } from "@/lib/formatRupiah";
import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";

const ButtonCheckout = ({ totalQuantity, link, getTotalPrice }) => {
	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[380px] md:max-w-[492px] w-full flex justify-center text-center">
			<Link href={link} className="w-full my-6 mx-4 rounded-lg">
				<button className="flex justify-between items-center bg-orange-500 h-16 rounded-lg text-white text-base font-semibold w-[380px] sm:w-[465px] hover:bg-orange-400  shadow-xl">
					<div className="flex items-center justify-center bg-white h-full w-20 rounded-l-lg relative">
						<span className="absolute top-2 right-1 bg-headingText text-white rounded-full w-5 h-5 flex justify-center items-center text-xs font-semibold">
							{totalQuantity}
						</span>
						<HiOutlineShoppingBag className="text-3xl text-headingText" />
					</div>
					<div className="flex justify-between items-center w-full px-4 text-lg">
						<div className="text-start">
							<p className="text-sm">Total</p>
							<p className="text-base font-bold">
								{formatRupiah(getTotalPrice())}
							</p>
						</div>
						<p>Checkout ({totalQuantity})</p>
					</div>
				</button>
			</Link>
		</div>
	);
};

export default ButtonCheckout;
