"use client";

import React, { createContext, useEffect, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [typeOrder, setTypeOrder] = useState("Dine In");
	const [tableNumber, setTableNumber] = useState("");

	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		const storedTableNumber = localStorage.getItem("tableNumber");
		const storedTypeOrder = localStorage.getItem("typeOrder");

		if (storedCart) setCart(JSON.parse(storedCart));
		if (storedTableNumber) setTableNumber(storedTableNumber);
		if (storedTypeOrder) setTypeOrder(storedTypeOrder);
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("tableNumber", tableNumber);
		localStorage.setItem("typeOrder", typeOrder);
	}, [cart, tableNumber, typeOrder]);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	};

	const removeFromCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem.quantity === 1) {
				return prevCart.filter((cartItem) => cartItem.id !== item.id);
			} else {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				);
			}
		});
	};

	const placeOrder = async (id_meja, total, mode, items) => {
		try {
			await fetch("http://localhost:8000/api/pesanan", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id_meja,
					total,
					mode,
					items,
				}),
			});

			localStorage.removeItem("cart");
			localStorage.removeItem("tableNumber");
			localStorage.removeItem("typeOrder");
			setCart([]);
			setTableNumber("");
			setTypeOrder("");
		} catch (error) {
			console.error("Error placing order:", error);
		}
	};

	const updateTableNumber = (number) => setTableNumber(number);
	const updateTypeOrder = (type) => setTypeOrder(type);
	const getTotalPrice = () =>
		cart.reduce((total, item) => total + item.harga * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				tableNumber,
				updateTableNumber,
				typeOrder,
				updateTypeOrder,
				getTotalPrice,
				placeOrder,
				setTableNumber,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
