import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Kontak = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="reservasi">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<p className="text-xl text-[#FEA92B] font-custom">Hubungi Kami</p>
					<h1 className="text-4xl md:text-5xl font-bold">Kontak</h1>
				</div>

				<div className="flex flex-col md:flex-row rounded-md gap-10 mt-10 mx-6 md:mx-0">
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
					<div className="flex flex-col w-full gap-4">
						<Link
							href="https://wa.link/7q4vpu"
							className="w-full flex flex-col gap-2 p-4 rounded-md space-y-2 text-center justify-center border hover:bg-slate-100"
							role="button"
							aria-label="Hubungi kami melalui WhatsApp"
						>
							<p className="font-custom text-headingText">WhatsApp</p>
							<p className="font-semibold">+62 895 6099 77877</p>
							<p className="flex items-center justify-center gap-1 text-gray-500">
								Hubungi kami melalui WhatsApp
								<span className="text-sm">
									<FaArrowRight />
								</span>
							</p>
						</Link>
						<div className=" w-full p-4 rounded-md space-y-2 text-center border">
							<p className="font-custom text-headingText">Email</p>
							<p className="font-semibold">baksodonoreborn@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Kontak;
