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
import MenuKategori from "./components/MenuKategori";
import { useCart } from "@/hooks/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import MenuFilter from "./components/MenuFilter";
import { FaArrowLeft } from "react-icons/fa6";
import ButtonCheckout from "./components/ButtonCheckout";
import ButtonFixed from "./components/ButtonFixed";

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
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8000/api/menu");
			const data = await response.json();
			setMenuData(data.data);
		};
		fetchData();
	}, []);

	const handleSaveTableNumber = () => {
		if (tableNumberInput.trim() === "") {
			setErrorMessage("Table number is required");
		} else {
			updateTableNumber(tableNumberInput);
			setIsDrawerOpen(false);
			setErrorMessage("");
		}
	};

	const handleDrawerChange = (isOpen) => {
		if (tableNumber === "") {
			setIsDrawerOpen(true);
		} else {
			setIsDrawerOpen(isOpen);
		}
	};

	const categorizedMenuData = menuData.reduce((acc, item) => {
		if (!acc[item.kategori]) acc[item.kategori] = [];
		acc[item.kategori].push(item);
		return acc;
	}, {});

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<section>
			<div className="max-w-[498px] mx-auto min-h-screen pb-28 bg-[#FAFAFA] relative border-x">
				<ButtonFixed href="/order/tipeorder" icon={<FaArrowLeft />} />
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
				<div className="flex flex-col bg-white m-4 rounded-lg border">
					{typeOrder === "Dine In" ? (
						<div className="flex justify-between items-center p-4">
							<div className="flex flex-col gap-1">
								<p className="font-semibold text-base">Table {tableNumber}</p>
								<p className="text-sm text-gray-400">Open Today, 08:00-23:00</p>
							</div>
							<Link href="operasional">
								<IoIosArrowForward />
							</Link>
						</div>
					) : (
						<div className="flex justify-between items-center p-4">
							<div className="flex flex-col gap-1">
								<p className="font-semibold text-base">{tableNumber}</p>
								<p className="text-sm text-gray-400">Open Today, 08:00-23:00</p>
							</div>
							<Link href="operasional">
								<IoIosArrowForward />
							</Link>
						</div>
					)}

					<Separator />
					<div className="flex justify-between items-center p-4">
						<p className="text-sm">Order Type</p>
						<p className="text-xs font-medium px-2 py-1 border rounded-md">
							{typeOrder}
						</p>
					</div>
				</div>

				<MenuFilter filterMenu={filterMenu} setFilterMenu={setFilterMenu} />
				<MenuKategori
					filterMenu={filterMenu}
					menuData={categorizedMenuData}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
					cart={cart}
				/>

				{totalQuantity > 0 && (
					<ButtonCheckout
						link={"/order/checkout"}
						totalQuantity={totalQuantity}
						getTotalPrice={getTotalPrice}
					/>
				)}

				{tableNumber === "" && isDrawerOpen && (
					<Drawer open={isDrawerOpen} onOpenChange={handleDrawerChange}>
						<DrawerTrigger className="hidden">Open</DrawerTrigger>
						<DrawerContent className="w-full md:w-[480px] mx-auto h-[300px]">
							<DrawerHeader>
								<DrawerTitle>{typeOrder}</DrawerTitle>
								<DrawerDescription>
									Please input your data to continue
								</DrawerDescription>
							</DrawerHeader>

							{typeOrder === "Dine In" ? (
								<div className="flex flex-col gap-2 m-4">
									<Label>Table Number</Label>
									<Input
										type="number"
										placeholder="Table number"
										value={tableNumberInput}
										onChange={(e) => setTableNumberInput(e.target.value)}
										className="w-full py-6 border rounded-lg"
									/>
									{errorMessage && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</div>
							) : (
								<div className="flex flex-col gap-2 m-4">
									<Label>Input Your Name</Label>
									<Input
										type="text"
										placeholder="Input Your Name"
										value={tableNumberInput}
										onChange={(e) => setTableNumberInput(e.target.value)}
										className="w-full py-6 border rounded-lg"
									/>
									{errorMessage && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</div>
							)}

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
