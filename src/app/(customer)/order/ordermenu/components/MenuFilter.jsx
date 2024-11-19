import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiMenu } from "react-icons/fi";
import { FaClosedCaptioning } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const MenuFilter = ({ filterMenu, setFilterMenu }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [kategori, setKategori] = useState([]);
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/kategori`
			);
			const data = await response.json();
			setKategori(data.data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			const menuFilterElement = document.getElementById("menu-filter");
			if (menuFilterElement) {
				const topOffset = menuFilterElement.offsetTop;
				if (offset > topOffset) {
					setIsFixed(true);
				} else {
					setIsFixed(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleFilterChange = (filter) => {
		setFilterMenu(filter);
		setIsDrawerOpen(false);
		const categorySection = document.getElementById(filter.toLowerCase());
		if (categorySection) {
			categorySection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<div
			id="menu-filter"
			className={`mx-4 mt-6 rounded-lg ${
				isFixed
					? "fixed top-0 bg-[#FAFAFA] max-w-[498px] w-full mx-auto p-4 rounded-t-lg mt-9"
					: ""
			}`}
		>
			<div className="flex items-center">
				<div className="flex h-8 items-center gap-3">
					<div
						className="inline-flex items-center whitespace-nowrap gap-3 border rounded-lg px-3 py-1.5 bg-white cursor-pointer"
						onClick={handleDrawerToggle}
					>
						<FiMenu />
						<span className="text-base font-medium">{filterMenu}</span>
					</div>
					{isDrawerOpen && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end h-full transition-all">
							<div className="bg-white max-w-[498px] w-full mx-auto p-4 rounded-t-lg">
								<div className="flex justify-between items-center text-base font-medium2">
									<h1>Category Menu</h1>
									<Button
										variant="ghost"
										onClick={handleDrawerToggle}
										className="text-lg"
									>
										<MdClose />
									</Button>
								</div>
								<div className="text-sm mb-6 text-gray-400">
									Please select your category menu
								</div>
								<div className="flex flex-col gap-3 mb-10">
									{kategori.map((item) => (
										<Button
											variant="outline"
											key={item.id}
											className="py-6 border rounded-lg"
											onClick={() => handleFilterChange(item.nama_kategori)}
										>
											{item.nama_kategori}
										</Button>
									))}
								</div>
							</div>
						</div>
					)}
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
