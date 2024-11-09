import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const Kontak = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="reservasi">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className="text-xl text-[#FEA92B] font-custom">Hubungi Kami</p>
					<h1 className="text-4xl md:text-5xl font-bold">Ajukan Pertanyaan</h1>
				</div>
				<div className="flex flex-row rounded-md gap-10 mt-10">
					<div className="w-full h-[500px] rounded-md">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.5615590397541!2d107.62489733976216!3d-6.892403705778532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7ac64fa5355%3A0xc1d2a77afa6a46e7!2sBakso%20Dono%20Reborn!5e0!3m2!1sen!2sid!4v1727161612587!5m2!1sen!2sid"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							frameBorder="0"
							className="w-full h-full"
							allowFullScreen=""
							aria-hidden="false"
							tabIndex="0"
						></iframe>
					</div>
					<div className="flex flex-col justify-start w-full h-[600px] ">
						<div className="flex flex-col w-full gap-4">
							<div className="flex w-full gap-4 mb-8">
								<div className=" w-full p-4 rounded-md space-y-2 text-center">
									<p className="font-custom text-headingText">Whatapps</p>
									<p>+62 895 6099 77877</p>
								</div>
								<div className=" w-full p-4 rounded-md space-y-2 text-center">
									<p className="font-custom text-headingText">Umum</p>
									<p>baksodonoreborn@gmail.com</p>
								</div>
							</div>
							<div className="flex gap-4">
								<Input
									type="text"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Nama Anda"
								/>
								<Input
									type="text"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Email anda"
								/>
							</div>
							<div className="flex gap-4 w-full">
								<Input
									type="text"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Subjek"
								/>
							</div>
							<Textarea
								placeholder="Pesan"
								className="bg-white text-black text-base rounded-none h-[100px]"
							/>
							<Button className="bg-[#FEA92B] text-white h-[60px] rounded-sm mb-3">
								Reservasi
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Kontak;
