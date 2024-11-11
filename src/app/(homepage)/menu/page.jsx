"use client";

import FilterMenu from "./components/FilterMenu";
import { CiBowlNoodles } from "react-icons/ci";
import { GiNoodles } from "react-icons/gi";
import { TbSoup } from "react-icons/tb";
import Menu1 from "@/assets/bg-hero.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

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

const formatUang = (uang) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(uang);
};

const MenuPage = () => {
	const [dataMenus, setDataMenus] = useState([]);

	console.log("data data:", dataMenus);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8000/api/menu", {
				cache: "force-cache",
			});
			const data = await response.json();
			setDataMenus(data.data);
		};

		fetchData();
	}, []);

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
							<h1 className="font-semibold text-2xl w-[250px]">
								Menu Mie Ayam
							</h1>
							<hr className="w-full" />
						</div>
						<div className="grid grid-cols-4 gap-6 mt-4">
							{dataMenus?.map((data) => (
								<Card key={data.id} className="flex-col rounded-md p-3">
									<Link href={`menu/${data.id}`}>
										<div className="bg-slate-100 rounded-lg">
											<Image
												src={`http://localhost:8000/api/menu/view/${data.gambar}`}
												alt={data.nama_menu}
												width={300}
												height={300}
												className="w-full h-[270px] rounded-sm"
											/>
										</div>
										<div className="text-center w-full my-4">
											<p className="font-semibold">{data.nama_menu}</p>
											<p className="text-gray-400 w-full text-sm">
												{data.deskripsi}
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
