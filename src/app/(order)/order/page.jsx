"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import MenuOrder from "./components/MenuOrder";
import MenuKategori from "./components/MenuKategori";
import { useCart } from "@/hooks/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ButtonCheckout from "@/app/(order)/order/components/ButtonCheckout";
import MenuFilter from "./components/MenuFilter";

const PageOrder = () => {
	const [menuData, setMenuData] = useState([]);
	const {
		addToCart,
		cart,
		removeFromCart,
		updateTableNumber,
		tableNumber,
		typeOrder,
		getTotalPrice,
	} = useCart();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const [tableNumberInput, setTableNumberInput] = useState("");
	const [filterMenu, setFilterMenu] = useState("Mie Bakso");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8000/api/menu");
			const data = await response.json();
			setMenuData(data.data);
		};

		fetchData();
	}, []);

	const handleSaveTableNumber = () => {
		updateTableNumber(tableNumberInput);
		setIsDrawerOpen(false);
	};

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<section>
			<div className="max-w-[498px] mx-auto min-h-screen pb-28 bg-[#FAFAFA] relative border-x">
				<div className="flex flex-col justify-center items-center hero-header h-[170px] rounded-b-md">
					<Image
						src="/logobdr.png"
						width={50}
						height={50}
						alt="logo"
						className="mb-1"
					/>
					<p className="text-lg font-bold text-headingText font-custom mb-2">
						Bakso Dono Reborn
					</p>
					<h1 className="text-2xl font-bold text-white">ORDER MENU</h1>
				</div>
				<div className="flex flex-col bg-white m-4 rounded-lg border">
					<div className="flex justify-between items-center p-4">
						<div className="flex flex-col gap-1">
							<p className="font-semibold text-base">
								Table {tableNumber === "" ? 0 : tableNumber}
							</p>
							<p className="text-sm text-gray-400">Open Today, 08:00-23:00</p>
						</div>
						<Link href="operasional">
							<IoIosArrowForward />
						</Link>
					</div>
					<Separator />
					<div className="flex justify-between items-center p-4">
						<p className="text-sm">Order Type</p>
						<p className="text-xs font-medium px-2 py-1 border rounded-md">
							{typeOrder}
						</p>
					</div>
				</div>

				<MenuFilter filterMenu={filterMenu} setFilterMenu={setFilterMenu} />

				<MenuKategori filtermenu={"Mie Baso"}>
					{menuData.map((data) => (
						<MenuOrder
							key={data.id}
							data={data}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
							cart={cart}
						/>
					))}
				</MenuKategori>

				{totalQuantity > 0 && (
					<ButtonCheckout link={"/checkout"} totalQuantity={totalQuantity} getTotalPrice={getTotalPrice}/>
				)}

				{tableNumber === "" && isDrawerOpen && (
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger className="hidden">Open</DrawerTrigger>
						<DrawerContent className="w-[480px] mx-auto h-[300px]">
							<DrawerHeader>
								<DrawerTitle>Dine In</DrawerTitle>
								<DrawerDescription>
									Please input your table number
								</DrawerDescription>
							</DrawerHeader>

							<div className="flex flex-col gap-2 m-4">
								<Label>Table Number</Label>
								<Input
									type="text"
									placeholder="Table number"
									value={tableNumberInput}
									onChange={(e) => setTableNumberInput(e.target.value)}
									className="w-full py-6 border rounded-lg"
								/>
							</div>

							<div className="m-4">
								<Button
									className="w-full py-6 bg-orange-500 text-white hover:bg-orange-400 hover:text-white"
									onClick={handleSaveTableNumber}
								>
									Save
								</Button>
							</div>
						</DrawerContent>
					</Drawer>
				)}
			</div>
		</section>
	);
};

export default PageOrder;
