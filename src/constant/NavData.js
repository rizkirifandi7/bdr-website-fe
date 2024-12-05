const { User } = require("lucide-react");
const { BiFoodMenu } = require("react-icons/bi");
const { LuMenuSquare, LuChefHat } = require("react-icons/lu");
const { MdOutlineSpaceDashboard, MdOutlineNoteAlt } = require("react-icons/md");

export const OrderNavData = {
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
					title: "Manajemen Pesanan",
					url: "/dashboard/kitchen-list",
					icon: <LuChefHat />,
				},
			],
		},
		{
			title: "Kelola User",
			url: "#",
			items: [
				{
					title: "User",
					url: "/dashboard/user",
					icon: <User />,
				},
			],
		},
	],
};

export const HomeNavData = {
	navMain: [
		{
			title: "Kelola Dashboard",
			url: "#",
			items: [
				{
					title: "Reservasi",
					url: "/dashboard-home/reservasi",
					icon: <MdOutlineSpaceDashboard />,
				},
				{ title: "Menu", url: "/dashboard-home/menu", icon: <BiFoodMenu /> },
				{
					title: "Menu Populer",
					url: "/dashboard-home/menu-populer",
					icon: <BiFoodMenu />,
				},
				{
					title: "Feedback",
					url: "/dashboard-home/feedback",
					icon: <MdOutlineSpaceDashboard />,
				},
			],
		},
	],
};
