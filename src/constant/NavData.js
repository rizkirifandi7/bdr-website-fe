import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const { User } = require("lucide-react");
const { BiFoodMenu } = require("react-icons/bi");
const { LuMenuSquare, LuChefHat } = require("react-icons/lu");
const { MdOutlineSpaceDashboard, MdOutlineNoteAlt } = require("react-icons/md");

const token = Cookies.get("auth_session");

let role = null;
if (token) {
	try {
		const decodedToken = jwtDecode(token);
		role = decodedToken.role;
	} catch (error) {
		console.error("Invalid token:", error);
	}
}

console.log({ token });

const OrderNavData = {
	navMain: [
		{
			title: "Kelola Menu",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard/home",
					icon: <MdOutlineSpaceDashboard />,
				},
				{ title: "Menu", url: "/dashboard/menu", icon: <BiFoodMenu /> },
				{
					title: "Kategori Menu",
					url: "/dashboard/kategori-menu",
					icon: <LuMenuSquare />,
				},
			],
		},
		{
			title: "Kelola Pesanan",
			url: "#",
			items: [
				{
					title: "Pesanan",
					url: "/dashboard/pesanan",
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Kitchen List Pesanan",
					url: "/dashboard/kitchen-list",
					icon: <LuChefHat />,
				},
			],
		},
	],
};

if (role !== "kasir") {
	OrderNavData.navMain.push({
		title: "Kelola User",
		url: "#",
		items: [
			{
				title: "User",
				url: "/dashboard/user",
				icon: <User />,
			},
		],
	});
}

export { OrderNavData };
