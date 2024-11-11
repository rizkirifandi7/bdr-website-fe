import { useCart } from "@/hooks/CartContext";
import { formatRupiah } from "@/lib/formatRupiah";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ItemMenu = ({ data }) => {
	const { addToCart, removeFromCart } = useCart();

	return (
		<div className="flex justify-between items-center gap-2">
			<div className="flex items-center gap-3 w-[300px] h-[120px]">
				<Image
					src={`http://localhost:8000/api/menu/view/${data.gambar}`}
					width={80}
					height={80}
					alt="menu"
					className="rounded-md"
				/>
				<div className="flex flex-col justify-between gap-1">
					<h1 className="font-semibold xs:text-sm md:text-base">
						{data.nama_menu}
					</h1>
					<p className="xs:text-xs md:text-sm text-gray-500">{data.kategori}</p>
					<p className="xs:text-sm md:text-base">{data.quantity}x</p>
				</div>
			</div>
			<div className="flex flex-col justify-between items-end gap-4">
				<p className="font-semibold text-base">{formatRupiah(data.harga)}</p>
				<div className="flex justify-between items-center gap-2 border rounded-lg">
					<button
						className="p-2 border-l rounded-lg hover:bg-headingText hover:text-white"
						onClick={() => removeFromCart(data)}
					>
						<FaMinus />
					</button>
					<p className="px-2">{data.quantity}</p>
					<button
						className="p-2 border-r rounded-lg hover:bg-headingText hover:text-white"
						onClick={() => addToCart(data)}
					>
						<FaPlus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemMenu;
