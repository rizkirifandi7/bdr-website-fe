"use client";

import Cookies from "js-cookie";
import React, {
	createContext,
	useEffect,
	useState,
	useContext,
	useMemo,
	useCallback,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [typeOrder, setTypeOrder] = useState("");
	const [tableNumber, setTableNumber] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		const storedTableNumber = localStorage.getItem("tableNumber");
		const storedTypeOrder = localStorage.getItem("typeOrder");
		const storedName = localStorage.getItem("name");

		if (storedCart) setCart(JSON.parse(storedCart));
		if (storedTableNumber) setTableNumber(storedTableNumber);
		if (storedTypeOrder) setTypeOrder(storedTypeOrder);
		if (storedName) setName(storedName);
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("tableNumber", tableNumber);
		localStorage.setItem("typeOrder", typeOrder);
		localStorage.setItem("name", name);
		Cookies.set("typeOrder", typeOrder);
	}, [cart, tableNumber, typeOrder, name]);

	const addToCart = useCallback((item) => {
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
	}, []);

	const removeFromCart = useCallback((item) => {
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
	}, []);

	const updateTableNumber = useCallback((number) => setTableNumber(number), []);
	const updateName = useCallback((name) => setName(name), []);
	const updateTypeOrder = useCallback((type) => setTypeOrder(type), []);
	const getTotalPrice = useCallback(
		() => cart.reduce((total, item) => total + item.harga * item.quantity, 0),
		[cart]
	);

	const contextValue = useMemo(
		() => ({
			cart,
			addToCart,
			removeFromCart,
			tableNumber,
			updateTableNumber,
			updateName,
			typeOrder,
			updateTypeOrder,
			getTotalPrice,
			setTableNumber,
			setCart,
			setTableNumber,
			setTypeOrder,
			setName,
			name,
		}),
		[
			cart,
			name,
			tableNumber,
			typeOrder,
			addToCart,
			removeFromCart,
			updateTableNumber,
			updateTypeOrder,
			updateName,
			getTotalPrice,
		]
	);

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
