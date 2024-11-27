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
import { toast } from "sonner";

const Feedback = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="layanan">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className=" text-xl text-[#FEA92B] font-custom">Testimoni</p>
					<h1 className="text-4xl md:text-5xl font-bold">Feedback Pelanggan</h1>
				</div>
			</div>
		</section>
	);
};

export default Feedback;
