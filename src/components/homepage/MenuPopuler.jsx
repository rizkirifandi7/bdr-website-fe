"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { MdOutlineFoodBank } from "react-icons/md";

const MenuPopuler = () => {
	const [menuItems, setMenuItems] = useState([]);

	const fetchMenuItems = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
			const data = await response.json();
			setMenuItems(data.data);
		} catch (error) {
			console.error("Error fetching menu items:", error);
		}
	}, []);

	useEffect(() => {
		fetchMenuItems();
	}, [fetchMenuItems]);

	const filterMenuPopuler = useMemo(() => {
		return menuItems.filter((menu) => menu.ispopuler === "populer");
	}, [menuItems]);

	return (
		<section className="min-h-[80vh] pt-40" id="menu">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className=" text-xl text-[#FEA92B] font-custom">Menu Makanan</p>
					<h1 className="text-4xl md:text-5xl font-bold">Produk Terpopuler</h1>
				</div>
				{filterMenuPopuler.length > 0 ? (
					<Carousel
						className="w-full mt-10 px-8"
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
					>
						<CarouselContent>
							{filterMenuPopuler.map((item) => (
								<CarouselItem
									key={item.id}
									className="basis-[380px] md:basis-1/2 lg:basis-1/3"
								>
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
														{item.kategori}
													</p>
												</div>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				) : (
					<div className="flex flex-col h-[300px] justify-center items-center">
						<MdOutlineFoodBank className="text-5xl" />
						<h1 className="text-center text-2xl">
							Tidak ada menu populer saat ini
						</h1>
					</div>
				)}
			</div>
		</section>
	);
};

export default MenuPopuler;
