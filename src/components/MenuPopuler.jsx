"use client";

import React from "react";
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

import Menu1 from "@/assets/bg-hero.jpg";

const MenuPopuler = () => {
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
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-2">
									<Card className="rounded-md ">
										<CardContent className="flex flex-col items-center justify-center p-0 ">
											<div className="flex items-center justify-center w-full h-[270px] px-5 pt-5">
												<Image
													src={Menu1}
													alt=""
													className="w-full h-full bg-center bg-no-repeat bg-cover rounded-md"
												/>
											</div>
											<div className="p-6">
												<div className="flex justify-between items-center">
													<h4 className="text-xl font-bold">Bakso Urat</h4>
												</div>
												<p className="text-pretty text-gray-400 text-base mt-2">
													Lorem ipsum dolor sit amet consectetur adipisicing
													elit. Aliquid illo illum quo tempora odio velit
													necessitatibus vitae assumenda voluptas iusto.
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
