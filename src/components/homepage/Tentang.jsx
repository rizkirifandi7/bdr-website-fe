import Image from "next/image";
import React from "react";
import Tentang3 from "@/assets/room1.jpg";
import { Button } from "../ui/button";
import Link from "next/link";

const Tentang = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="tentang">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex gap-4 md:gap-0 flex-col-reverse md:flex-row md:justify-between items-center p-4">
					<div className="grid grid-cols-2 gap-4 md:w-1/2 mt-4 md:mt-0">
						<div className="">
							<Image
								src={Tentang3}
								alt="hero"
								className="w-56 md:w-full h-fit rounded-md"
							/>
						</div>
						<div className="flex items-end">
							<Image
								src={Tentang3}
								alt="hero"
								className="w-56 md:w-[200px] h-fit rounded-md"
							/>
						</div>
						<div className="flex justify-end">
							<Image
								src={Tentang3}
								alt="hero"
								className="w-56 md:w-[200px] h-fit rounded-md"
							/>
						</div>
						<div className="">
							<Image
								src={Tentang3}
								alt="hero"
								className="w-56 md:w-[260px] h-[190px] rounded-md"
							/>
						</div>
					</div>
					<div className="flex flex-col md:w-1/2">
						<p className="text-xl font-medium text-headingText font-custom">
							Tentang Kami
						</p>
						<h1 className="text-[2.5rem] font-bold mb-4">
							Selamat Datang di Bakso Dono Reborn
						</h1>
						<p className="text-sm text-gray-500 text-justify">
							Selamat datang di Bakso Dono Reborn! Kami menyajikan bakso dan mie
							berkualitas tinggi yang diproduksi sendiri, dengan layanan antar
							ke seluruh Galaxy. Nikmati suasana keluarga yang nyaman di
							restoran kami yang luas, terdiri dari tiga lantai dengan
							playground untuk anak-anak.
						</p>
						<div className="flex items-center justify-start mt-8">
							<div className="basis-1/2 flex items-center border-l-4 border-headingText p-2">
								<p className="text-5xl font-bold text-headingText px-4">15</p>
								<div className="flex flex-col gap-0 pl-2">
									<p className="text-base">Tahun</p>
									<p className="uppercase text-sm font-bold">Pengalaman</p>
								</div>
							</div>
							<div className="basis-1/2 flex items-center border-l-4 border-headingText  p-2">
								<p className="text-5xl font-bold text-headingText px-4">30</p>
								<div className="flex item flex-col gap-0 pl-2">
									<p className="text-base">Menu</p>
									<p className="uppercase text-sm font-bold">
										Makanan dan Minuman
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tentang;
