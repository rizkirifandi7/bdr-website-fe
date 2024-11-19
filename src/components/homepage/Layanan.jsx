import React from "react";
import { Card } from "../ui/card";
import { LuChefHat, LuQrCode } from "react-icons/lu";
import { ImSpoonKnife } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";

const Layanan = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="layanan">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className="text-xl text-[#FEA92B] font-custom">Layanan</p>
					<h1 className="text-4xl md:text-5xl font-bold">Layanan Kami</h1>
				</div>

				<div className="grid grid-cols-4 gap-4 mt-10">
					<Card className="rounded-md">
						<div className="flex flex-col items-center justify-center  w-full h-[300px] gap-2 p-4 text-center">
							<LuChefHat className="text-5xl text-headingText" />
							<h4 className="font-bold text-xl">Koki Ahli</h4>
							<p className="text-base text-gray-500">
								Koki Ahli kami menyajikan hidangan berkualitas tinggi dengan
								cita rasa autentik dan presentasi yang memukau.
							</p>
						</div>
					</Card>
					<Card className="rounded-md">
						<div className="flex flex-col items-center justify-center  w-full h-[300px] gap-2 p-4 text-center">
							<ImSpoonKnife className="text-5xl text-headingText" />
							<h4 className="font-bold text-xl">Makanan Berkualitas</h4>
							<p className="text-base text-gray-500">
								Makanan berkualitas menggunakan bahan terbaik, disiapkan dengan
								keahlian, dan cita rasa sempurna
							</p>
						</div>
					</Card>
					<Card className="rounded-md">
						<div className="flex flex-col items-center justify-center  w-full h-[300px] gap-2 p-4 text-center">
							<LuQrCode className="text-5xl text-headingText" />
							<h4 className="font-bold text-xl">Order via QR</h4>
							<p className="text-base text-gray-500">
								Pesan mudah dan cepat melalui QR code di meja, tanpa perlu
								menunggu pelayan.
							</p>
						</div>
					</Card>
					<Card className="rounded-md">
						<div className="flex flex-col items-center justify-center  w-full h-[300px] gap-2 p-4 text-center">
							<TbTruckDelivery className="text-5xl text-headingText" />
							<h4 className="font-bold text-xl">Pesan Antar</h4>
							<p className="text-base text-gray-500">
								Antarkan pesanan anda ke lokasi dengan gratis ongkir.
							</p>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Layanan;
