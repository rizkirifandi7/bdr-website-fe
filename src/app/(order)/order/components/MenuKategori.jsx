import React from "react";
import MenuOrder from "./MenuOrder";

const MenuKategori = ({ menuData, addToCart, removeFromCart, cart }) => {
	return (
		<>
			{Object.keys(menuData).map((kategori) => (
				<section
					className="w-auto mx-4 mt-6"
					key={kategori}
					id={kategori.toLowerCase()}
				>
					<div className="flex items-center mb-3 ml-1">
						<h1 className="font-semibold text-base w-fit whitespace-nowrap mr-2 uppercase">
							{kategori}
						</h1>
						<div className="w-full border-t border-gray-300 h-[1px]" />
					</div>
					<div className="grid grid-cols-2 sm:gap-4 gap-3">
						{menuData[kategori].map((data) => (
							<MenuOrder
								key={data.id}
								data={data}
								addToCart={addToCart}
								removeFromCart={removeFromCart}
								cart={cart}
							/>
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default MenuKategori;
