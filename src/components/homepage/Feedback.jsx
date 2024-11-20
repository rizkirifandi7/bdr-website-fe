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
import React from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";

const Feedback = () => {
	const [feedback, setFeedback] = React.useState([]);

	const filteredFeedback = feedback.filter((item) => item.rating >= 4);

	React.useEffect(() => {
		const fetchDataFeedback = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/feedback`
				);
				setFeedback(response.data.data);
			} catch (error) {
				toast.error("Gagal mengambil data feedback");
			}
		};

		fetchDataFeedback();
	}, []);

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
						{filteredFeedback.map((feedback, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-2">
									<Card className="rounded-md">
										<CardContent className="flex flex-col items-center justify-start p-0 ">
											<div className="p-6 w-full">
												<div className="flex gap-3 items-center">
													<div className="text-xl text-orange-400 border p-1 rounded-lg border-orange-400">
														<FaRegUser />
													</div>
													<p className="text-xl font-semibold">
														{feedback.nama_pelanggan}
													</p>
												</div>
												<p className="text-pretty text-base mt-2 break-words w-[full]">
													{feedback.deskripsi}
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
