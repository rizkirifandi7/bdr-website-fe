"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useCart } from "@/hooks/CartContext";
import MenuKategori from "./components/MenuKategori";
import MenuFilter from "./components/MenuFilter";
import ButtonCheckout from "./components/ButtonCheckout";
import ButtonFixed from "./components/ButtonFixed";
import InputDataPelanggan from "./components/InputDataPelanggan";
import InformationOrder from "./components/InformationOrder";
import Banner from "./components/Banner";

const PageOrder = () => {
	const {
		addToCart,
		cart,
		removeFromCart,
		typeOrder,
		getTotalPrice,
		updateName,
		name,
	} = useCart();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const [nameInput, setNameInput] = useState("");
	const [filterMenu, setFilterMenu] = useState("Mie Bakso");
	const [menuData, setMenuData] = useState([]);
	const [errorMessage, setErrorMessage] = useState({ name: "" });

	const handleSaveTableNumber = useCallback(() => {
		const errors = { name: "" };
		let hasError = false;

		if (nameInput.trim() === "") {
			errors.name = "Name is required";
			hasError = true;
		}

		setErrorMessage(errors);

		if (!hasError) {
			updateName(nameInput);
			setIsDrawerOpen(false);
			setErrorMessage({ name: "" });
		}
	}, [nameInput, updateName]);

	const handleDrawerChange = useCallback(
		(isOpen) => {
			if (name === "" && typeOrder === "Dine In") {
				setIsDrawerOpen(true);
			} else {
				setIsDrawerOpen(isOpen);
			}
		},
		[name, typeOrder]
	);

	const handleInputChange = useCallback((e) => {
		const value = e.target.value;
		setNameInput(value);
		if (value.trim() !== "") {
			setErrorMessage((prev) => ({ ...prev, name: "" }));
		}
	}, []);

	const fetchData = useCallback(async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
		const data = await response.json();
		setMenuData(data.data);
	}, []);

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

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<section>
			<div className="max-w-[498px] mx-auto min-h-screen pb-28 bg-[#FAFAFA] relative border-x">
				<ButtonFixed href="/order/tipeorder" icon={<FaArrowLeft />} />

				<Banner />

				<InformationOrder name={name} typeOrder={typeOrder} />

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

				{name === "" && isDrawerOpen && (
					<Drawer open={isDrawerOpen} onOpenChange={handleDrawerChange}>
						<DrawerTrigger className="hidden">Open</DrawerTrigger>
						<InputDataPelanggan
							typeOrder={typeOrder}
							nameInput={nameInput}
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
