import { CartProvider } from "@/hooks/CartContext";
import { Fragment } from "react";

export const metadata = {
	title: "Order | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons:{
		icon: "/favicon.ico",
	}
};

export default function OrderRoot({ children }) {
	return (
		<Fragment>
			<CartProvider>{children}</CartProvider>;
		</Fragment>
	);
}
