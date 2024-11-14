import { CartProvider } from "@/hooks/CartContext";

export const metadata = {
	title: "Order | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
};

export default function OrderRoot({ children }) {
	return <CartProvider>{children}</CartProvider>;
}
