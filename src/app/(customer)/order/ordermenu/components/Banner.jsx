import Image from "next/image";
import React from "react";

const Banner = () => {
	return (
		<div className="flex flex-col justify-center items-center hero-header h-[180px] rounded-b-md  ">
			<Image
				src="/logobdr.png"
				width={50}
				height={50}
				alt="logo"
				className="mb-1"
			/>
			<h1 className="text-2xl font-bold text-headingText mb-2">
				Bakso Dono Reborn
			</h1>
		</div>
	);
};

export default Banner;
