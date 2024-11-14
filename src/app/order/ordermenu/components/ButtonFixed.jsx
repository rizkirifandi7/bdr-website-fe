import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const ButtonFixed = () => {
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			const buttonElement = document.getElementById("fixed-button");
			if (buttonElement) {
				const topOffset = buttonElement.offsetTop;
				if (offset > topOffset) {
					setIsFixed(true);
				} else {
					setIsFixed(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="relative">
			{/* Other components */}
			<div
				id="fixed-button"
				className={`fixed top-0  left-1/2 transform -translate-x-1/2 z-50 max-w-[498px] w-full ${
					isFixed
						? "fixed top-0 w-full mt-0 ml-0 bg-[#FAFAFA] py-2 px-1 border-x"
						: "ml-4 mt-4"
				}`}
			>
				<div className="flex justify-between items-center">
					<button
						className={`rounded ml-1 bg-[#FAFAFA] p-2 ${
							isFixed ? "ml-3 bg-[#FAFAFA] " : ""
						}`}
					>
						<Link href="/order/tipeorder">
							<FaArrowLeft className="text-black" />
						</Link>
					</button>
					{isFixed && (
						<div className="">
							<p className="text-black text-base font-semibold">
								Bakso Dono Reborn
							</p>
						</div>
					)}
					<div className=""></div>
				</div>
			</div>
			{/* Other components */}
		</div>
	);
};

export default ButtonFixed;
