"use client";
import React, { useState, useEffect } from "react";
import FilterMenu from "./components/FilterMenu";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MdOutlineFoodBank } from "react-icons/md";

const MenuPage = () => {
	const [dataMenus, setDataMenus] = useState([]);
	const [dataFilterMenu, setDataFilterMenu] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const fetchData = async () => {
		const response = await fetch("http://localhost:8000/api/menu");
		const data = await response.json();
		setDataMenus(data.data);
	};

	const fetchKategori = async () => {
		const response = await fetch("http://localhost:8000/api/kategori");
		const data = await response.json();
		setDataFilterMenu(data.data);
	};

	useEffect(() => {
		fetchData();
		fetchKategori();
	}, []);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	const filteredMenus = selectedCategory
		? dataMenus.filter((menu) => menu.id_kategori === selectedCategory.id)
		: dataMenus;

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
								namafilter={data.nama_kategori}
								onClick={() => handleCategorySelect(data)}
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
						{filteredMenus.length > 0 ? (
							<div className="grid grid-cols-4 gap-6 mt-4">
								{filteredMenus.map((data) => (
									<Card key={data.id} className="flex-col rounded-md p-3">
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
									</Card>
								))}
							</div>
						) : (
							<div className="flex flex-col h-[500px] justify-center items-center">
								<MdOutlineFoodBank className="text-5xl" />
								<h1 className="text-center text-2xl font-semibold">
									Tidak ada menu
								</h1>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuPage;
