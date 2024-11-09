import React from "react";

const FilterMenu = ({ namafilter, stock, Icon }) => {
	return (
		<button className="flex items-center justify-start h-20 border rounded-md p-3 gap-2 hover:bg-headingText hover:text-white group">
			<div className="border rounded-md text-4xl p-2 bg-gray-100 text-black">
				{Icon}
			</div>
			<div className="">
				<p className="font-semibold">{namafilter}</p>
				<p className="text-gray-400 text-left text-sm">{stock} Menu</p>
			</div>
		</button>
	);
};

export default FilterMenu;
