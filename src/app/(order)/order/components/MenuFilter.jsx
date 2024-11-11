import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { FiMenu } from "react-icons/fi";
import { useEffect } from "react";

const MenuFilter = ({ filterMenu, setFilterMenu }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [kategori, setKategori] = useState([]);

	console.log(kategori);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8000/api/kategori", {
				cache: "force-cache",
			});
			const data = await response.json();
			setKategori(data.data);
		};

		fetchData();
	}, []);

	const handleFilterChange = (filter) => {
		setFilterMenu(filter);
		setIsDrawerOpen(false);
	};

	return (
		<div className="mx-4 mt-6 rounded-lg">
			<div className="flex items-center">
				<div className="flex h-8 items-center gap-3">
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger className="inline-flex items-center whitespace-nowrap gap-3 border rounded-lg px-3 py-1.5 bg-white">
							<FiMenu />
							<span className="text-base font-medium">{filterMenu}</span>
						</DrawerTrigger>
						<DrawerContent className="max-w-[498px] mx-auto">
							<DrawerHeader>
								<DrawerTitle className="text-base">Category Menu</DrawerTitle>
								<DrawerDescription>
									Please select your category menu
								</DrawerDescription>
							</DrawerHeader>
							<div className="flex flex-col gap-3 p-4 mb-10">
								{kategori.map((item) => (
									<Button
										key={item.id}
										variant="outline"
										className="py-6"
										onClick={() => handleFilterChange(item.nama_kategori)}
									>
										{item.nama_kategori}
									</Button>
								))}
							</div>
						</DrawerContent>
					</Drawer>
					<Separator orientation="vertical" />
				</div>
				<div className="ml-2 flex gap-0.5 overflow-x-auto touch-auto scrollbar-hide">
					{kategori.map((item) => (
						<Button
							key={item.id}
							variant="ghost"
							className={`text-base ${
								filterMenu === item.nama_kategori
									? "border-b-2 rounded-none border-headingText"
									: ""
							}`}
							onClick={() => handleFilterChange(item.nama_kategori)}
						>
							{item.nama_kategori}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
};

export default MenuFilter;
