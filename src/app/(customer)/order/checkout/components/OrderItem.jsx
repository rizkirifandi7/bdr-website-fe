import ItemMenu from "@/components/ItemMenu";
import React from "react";
import { MdAdd } from "react-icons/md";

const OrderItem = ({ totalQuantity, cart }) => {
	return (
		<div className="bg-white m-4">
			<div className="flex flex-col p-4 rounded-lg border ">
				<div className="flex justify-between items-center mb-2">
					<h1 className="inline-flex items-center font-semibold text-lg">
						Ordered Items ({totalQuantity})
					</h1>
					<a
						href="/order/ordermenu"
						className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-sm bg-white text-black shadow-none border border-orange-400 hover:bg-orange-400 hover:text-white"
					>
						<MdAdd className="text-sm" />
						Add Item
					</a>
				</div>
				<div className="flex flex-col">
					{cart.map((data, index) => (
						<ItemMenu key={index} data={data} menu={"cart"} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
