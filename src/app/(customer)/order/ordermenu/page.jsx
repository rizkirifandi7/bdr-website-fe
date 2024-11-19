"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import MenuKategori from "./components/MenuKategori";
import { useCart } from "@/hooks/CartContext";
import MenuFilter from "./components/MenuFilter";
import { FaArrowLeft } from "react-icons/fa6";
import ButtonCheckout from "./components/ButtonCheckout";
import ButtonFixed from "./components/ButtonFixed";
import InputDataPelanggan from "./components/InputDataPelanggan";

const PageOrder = () => {
	const {
		addToCart,
		cart,
		removeFromCart,
		updateTableNumber,
		tableNumber,
		typeOrder,
		getTotalPrice,
		updateName,
		name,
	} = useCart();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const [tableNumberInput, setTableNumberInput] = useState("");
	const [nameInput, setNameInput] = useState("");
	const [filterMenu, setFilterMenu] = useState("Mie Bakso");
	const [menuData, setMenuData] = useState([]);
	const [errorMessage, setErrorMessage] = useState({
		name: "",
		tableNumber: "",
	});

	const handleSaveTableNumber = useCallback(() => {
		const errors = {
			name: "",
			tableNumber: "",
		};
		let hasError = false;

		if (nameInput.trim() === "") {
			errors.name = "Name is required";
			hasError = true;
		}

		if (typeOrder === "Dine In" && tableNumberInput.trim() === "") {
			errors.tableNumber = "Table number is required";
			hasError = true;
		}

		setErrorMessage(errors);

		if (!hasError) {
			updateName(nameInput);
			if (typeOrder === "Dine In") {
				updateTableNumber(tableNumberInput);
			}
			setIsDrawerOpen(false);
			setErrorMessage({ name: "", tableNumber: "" });
		}
	}, [nameInput, tableNumberInput, typeOrder, updateName, updateTableNumber]);

	const handleDrawerChange = useCallback(
		(isOpen) => {
			if (tableNumber === "" && typeOrder === "Dine In") {
				setIsDrawerOpen(true);
			} else {
				setIsDrawerOpen(isOpen);
			}
		},
		[tableNumber, typeOrder]
	);

	const handleInputChange = useCallback((e, field) => {
		const value = e.target.value;
		if (field === "name") {
			setNameInput(value);
			if (value.trim() !== "") {
				setErrorMessage((prev) => ({ ...prev, name: "" }));
			}
		} else if (field === "tableNumber") {
			setTableNumberInput(value);
			if (value.trim() !== "") {
				setErrorMessage((prev) => ({ ...prev, tableNumber: "" }));
			}
		}
	}, []);

	const fetchData = useCallback(async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
		const data = await response.json();
		setMenuData(data.data);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const categorizedMenuData = useMemo(() => {
		return menuData.reduce((acc, item) => {
			if (!acc[item.kategori]) acc[item.kategori] = [];
			acc[item.kategori].push(item);
			return acc;
		}, {});
	}, [menuData]);

	const totalQuantity = useMemo(() => {
		return cart.reduce((acc, item) => acc + item.quantity, 0);
	}, [cart]);

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
								<p className="font-semibold text-base">{name}</p>
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
						<InputDataPelanggan
							typeOrder={typeOrder}
							nameInput={nameInput}
							tableNumberInput={tableNumberInput}
							errorMessage={errorMessage}
							handleInputChange={handleInputChange}
							handleSaveTableNumber={handleSaveTableNumber}
						/>
					</Drawer>
				)}
			</div>
		</section>
	);
};

export default PageOrder;
