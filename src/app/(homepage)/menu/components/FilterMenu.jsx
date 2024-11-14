import React from "react";
import { MdOutlineFoodBank } from "react-icons/md";

const FilterMenu = ({ namafilter, onClick }) => {
	return (
		<button
			className="flex items-center justify-start h-20 border rounded-md p-3 gap-2 hover:bg-headingText hover:text-white group"
			onClick={onClick}
		>
			<div className="border rounded-md text-4xl p-2 bg-gray-100 text-black">
				<MdOutlineFoodBank />
			</div>
			<div className="">
				<p className="font-semibold">{namafilter}</p>
			</div>
		</button>
	);
};

export default FilterMenu;
