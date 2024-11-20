"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const MenuPopuler = () => {
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/pesanan`
				);
				const data = await response.json();
				if (data.status) {
					const menuCount = {};

					// Count the number of times each menu item is ordered
					data.data.forEach((order) => {
						order.item_pesanan.forEach((item) => {
							const menuId = item.menu.id;
							if (menuCount[menuId]) {
								menuCount[menuId].count += item.jumlah;
							} else {
								menuCount[menuId] = {
									...item.menu,
									count: item.jumlah,
								};
							}
						});
					});

					// Convert the menuCount object to an array and sort by count
					const sortedMenuItems = Object.values(menuCount).sort(
						(a, b) => b.count - a.count
					);

					setMenuItems(sortedMenuItems);
				}
			} catch (error) {
				console.error("Error fetching menu items:", error);
			}
		};

		fetchMenuItems();
	}, []);

	return (
		<section className="min-h-[80vh] pt-40" id="menu">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className=" text-xl text-[#FEA92B] font-custom">Menu Makanan</p>
					<h1 className="text-4xl md:text-5xl font-bold">Produk Terpopuler</h1>
				</div>
				<Carousel
					className="w-full mt-10"
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
				>
					<CarouselContent className="-ml-1">
						{menuItems.map((item) => (
							<CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-2">
									<Card className="rounded-md ">
										<CardContent className="flex flex-col items-center justify-center p-0 ">
											<div className="flex items-center justify-center w-full h-[270px] px-5 pt-5 text-headingText bg-orange-100">
												<Image
													src={`${process.env.NEXT_PUBLIC_API_URL}/menu/view/${item.gambar}`}
													alt={item.nama_menu}
													className="w-auto h-auto bg-center bg-no-repeat bg-cover rounded-md"
													width={200}
													height={200}
													loading="lazy"
												/>
											</div>
											<div className="p-6">
												<div className="flex justify-between items-center text-center">
													<h4 className="text-xl font-semibold">
														{item.nama_menu}
													</h4>
												</div>
												<p className="text-pretty text-gray-400 text-base mt-2 text-center">
													{item.kategori.nama_kategori}
												</p>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
};

export default MenuPopuler;
