import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const operationalHours = [
	"MONDAY 08:00 - 23:00",
	"TUESDAY 08:00 - 23:00",
	"WEDNESDAY 08:00 - 23:00",
	"THURSDAY 08:00 - 23:00",
	"FRIDAY 08:00 - 23:00",
	"SATURDAY 08:00 - 23:00",
	"SUNDAY 08:00 - 23:00",
];

const daysOfWeek = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];

const PageOperasional = () => {
	const today = new Date().getDay();
	const todayString = daysOfWeek[today];

	return (
		<section>
			<div className="max-w-[498px] mx-auto min-h-screen pb-2 bg-[#FAFAFA] relative">
				<div className="w-full rounded-md relative">
					<Image
						src="/map.jpeg"
						width={498}
						height={200}
						alt="logo"
						className="bg-cover object-cover"
						priority
					/>

					<Link
						href="/order/ordermenu"
						className="fixed top-0 mt-4 ml-4 left-1/2 transform -translate-x-1/2 z-50 max-w-[498px] w-full"
					>
						<FaArrowLeft className="text-xl" />
					</Link>
				</div>
				<div className="flex flex-col bg-white rounded-t-lg border absolute top-[350px] right-0 w-full">
					<div className="flex justify-between items-center p-4">
						<div className="flex flex-col gap-2 w-full">
							<h1 className="font-bold text-lg">Bakso Dono Reborn</h1>
							<p className="text-xs text-gray-400">
								Jl. Belakang Pasar No.24, Sadang Serang, Kec.Coblong, Kota
								Bandung 40133 Jawa Barat.
							</p>
							<div className="flex gap-2 mt-4">
								<Button className="w-full flex-grow" variant="outline">
									Contact Us
								</Button>
								<Button className="w-full flex-grow" variant="outline">
									Visit Us
								</Button>
							</div>
						</div>
					</div>
					<Separator />
					<div className="flex flex-col items-start p-4 w-full">
						<h1 className="font-bold text-base">Operational Hours</h1>
						<div className="flex flex-col px-4 pb-4 gap-2 w-full ">
							{operationalHours.map((hour, index) => (
								<div key={index} className="border-b-2 w-full">
									<p
										className={`py-3 text-sm ${
											hour.startsWith(todayString)
												? "font-bold text-black"
												: "text-gray-500"
										}`}
									>
										{hour}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageOperasional;
