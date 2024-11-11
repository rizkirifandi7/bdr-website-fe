import React from "react";

const MenuKategori = ({ children, filtermenu }) => {
	return (
		<div className="w-auto mx-4 mt-6">
			<div className="flex items-center mb-3 ml-1">
				<h1 className="font-semibold text-base w-fit whitespace-nowrap mr-2 uppercase">
					{filtermenu}
				</h1>
				<div className="w-full border-t border-gray-300 h-[1px]" />
			</div>
			<div className="grid grid-cols-2 sm:gap-4 gap-3">{children}</div>
		</div>
	);
};

export default MenuKategori;
