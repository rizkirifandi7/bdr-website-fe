"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import Menu1 from "@/assets/bg-hero.jpg";

const Feedback = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="layanan">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className=" text-xl text-[#FEA92B] font-custom">Testimoni</p>
					<h1 className="text-4xl md:text-5xl font-bold">Feedback Pelanggan</h1>
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
									<Card className="rounded-md">
										<CardContent className="flex flex-col items-center justify-center p-0 ">
											<div className="p-6">
												<div className="flex gap-3 items-center">
													<Image
														src={Menu1}
														alt=""
														className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full"
													/>
													<p className="text-xl font-bold">Bakso Urat</p>
												</div>
												<p className="text-pretty text-gray-500 text-base mt-2">
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

export default Feedback;
