import React from "react";
import FilterMenu from "./components/FilterMenu";
import { CiBowlNoodles } from "react-icons/ci";
import { GiNoodles } from "react-icons/gi";
import { TbSoup } from "react-icons/tb";
import Menu1 from "@/assets/bg-hero.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Link from "next/link";

const dataFilterMenu = [
	{
		id: 1,
		namafilter: "Mie Yamin",
		stock: "10",
		Icon: <GiNoodles />,
	},
	{
		id: 2,
		namafilter: "Mie Ayam",
		stock: "15",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 3,
		namafilter: "Bakso Urat",
		stock: "20",
		Icon: <TbSoup />,
	},
	{
		id: 4,
		namafilter: "Bakso Halus",
		stock: "25",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 5,
		namafilter: "Soto Ayam",
		stock: "30",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 6,
		namafilter: "Nasi Goreng",
		stock: "12",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 7,
		namafilter: "Ayam Geprek",
		stock: "18",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 8,
		namafilter: "Es Teh Manis",
		stock: "50",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 9,
		namafilter: "Es Jeruk",
		stock: "50",
		Icon: <CiBowlNoodles />,
	},
	{
		id: 10,
		namafilter: "Es Campur",
		stock: "50",
		Icon: <CiBowlNoodles />,
	},
];

const dataMenu = [
	{
		id: 1,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 2,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 3,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 4,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 5,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 6,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 7,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 8,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
	{
		id: 9,
		namamenu: "Mie Ayam Bakso",
		harga: 15000,
		gambar: Menu1,
	},
];

const formatUang = (uang) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(uang);
};

const MenuPage = () => {
	return (
		<div className="">
			<div className="h-full max-w-screen-xl mx-auto">
				<div className="flex justify-center items-center hero-header h-[300px] rounded-b-md">
					<h1 className="text-5xl font-bold text-white pt-14">DAFTAR MENU</h1>
				</div>
				<div className="h-full my-10">
					<div className="grid grid-cols-5 gap-4 mt-4">
						{dataFilterMenu.map((data) => (
							<FilterMenu
								key={data.id}
								namafilter={data.namafilter}
								stock={data.stock}
								Icon={data.Icon}
							/>
						))}
					</div>
					<div className="mt-10">
						<div className="flex items-center">
							<h1 className="font-semibold text-2xl w-[250px]">Menu Mie Ayam</h1>
							<hr className="w-full" />
						</div>
						<div className="grid grid-cols-4 gap-6 mt-4">
							{dataMenu.map((data) => (
								<Card key={data.id} className="flex-col rounded-md p-3">
									<Link href={`menu/${data.id}`}>
										<Image
											src={data.gambar}
											alt={data.namamenu}
											className="w-full h-[200px] object-cover rounded-sm"
										/>
										<div className="text-start w-full my-4">
											<p className="font-semibold">{data.namamenu}</p>
											<p className="text-gray-400 w-full text-sm">
												Lorem ipsum dolor, sit amet consectetur adipisicing
												elit. Sit, vitae?Lorem ipsum dolor, sit amet consectetur
												adipisicing elit. Sit, vitae?
											</p>
										</div>
									</Link>
									{/* <div className="flex justify-between items-center mt-2">
										<p className="text-base font-semibold">
											{formatUang(data.harga)}
										</p>
										<Button
											className="hover:bg-headingText hover:text-white"
											size="icon"
											variant="outline"
										>
											<MdOutlineAddShoppingCart />
										</Button>
									</div> */}
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuPage;
