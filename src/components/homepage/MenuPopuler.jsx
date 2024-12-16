"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
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
						className="w-full mt-10 px-10"
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
									className="basis-[350px] md:basis-1/3"
								>
									<div className="p-2">
										<Card className="rounded-md ">
											<div className="flex flex-col items-center justify-center">
												<div className="flex items-center justify-center w-full h-[270px] bg-orange-100">
													<Image
														src={item.gambar}
														alt={item.nama_menu}
														className="w-auto h-auto bg-center bg-no-repeat bg-cover rounded-md"
														width={200}
														height={200}
														loading="lazy"
													/>
												</div>
												<div className="p-4">
													<h4 className="text-xl font-semibold text-center">
														{item.nama_menu}
													</h4>
													<p className="text-gray-400 text-base mt-2 text-center truncate w-[300px]">
														{item.deskripsi}
													</p>
												</div>
											</div>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				) : (
					<div className="flex flex-col h-[300px] justify-center items-center">
						<MdOutlineFoodBank className="text-4xl" />
						<h1 className="text-center text-xl">
							Tidak ada menu populer saat ini
						</h1>
					</div>
				)}
			</div>
		</section>
	);
};

export default MenuPopuler;
