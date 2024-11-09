import Image from "next/image";
import React from "react";
import HomeBG from "@/assets/hero.png";
import { Button } from "./ui/button";

const Jumbotron = () => {
	return (
		<section className="min-h-screen pt-20 md:pt-40 hero-header" id="#">
			<div className="max-w-screen-xl mx-auto text-white">
				<div className="flex flex-col-reverse md:flex-row md:justify-between items-center p-4">
					<div className="flex flex-col items-center md:items-start gap-4 md:w-[600px]">
						<h1 className="text-4xl md:text-7xl font-bold">
							Bakso Dono Reborn
						</h1>
						<p className="text-sm md:text-base mt-4 text-center md:text-left md:w-[600px]">
							Kami hadir untuk memanjakan anda dengan cita rasa autentik mie dan
							bakso yang lezat! Di Bakso Dono Reborn, setiap mangkuk kami,
							disiapkan dengan bahan-bahan segar dan resep istimewa. Nikmati
							kelezatan mie yang kenyal dan bakso yang juicy dalam suasana
							hangat dan ramah. Bergabunglah bersama kami dan rasakan kenikmatan
							yang tak tertandingi di setiap suapan!
						</p>

						<div className="flex gap-4 mt-4 md:mt-10">
							<Button className="bg-[#FEA92B] py-6 px-6 text-sm md:text-lg">
								Reservasi
							</Button>
							<Button className="bg-transparent py-6 px-6 text-sm md:text-lg">
								Lihat Menu
							</Button>
						</div>
					</div>
					<div className="mb-10 md:mb-0">
						<Image
							src={HomeBG}
							alt="hero"
							className="w-56 md:w-[600px] h-full animate-spin-slow"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
