"use client";

import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Reservasi = () => {
	const [date, setDate] = React.useState();

	return (
		<section className="min-h-[80vh] pt-40" id="reservasi">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-row bg-[#0F172B] rounded-md">
					<div className="w-full h-[600px] py-10 pl-10">
						<iframe
							className="rounded-md"
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/KyQEZmanhZ0"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
					<div className="flex flex-col justify-center p-10 w-full h-[600px] ">
						<p className="text-lg font-custom text-headingText">Reservasi</p>
						<h1 className="text-[2.5rem] font-bold text-white">
							Reservasi tempat
						</h1>
						<div className="flex flex-col w-full gap-4 mt-4">
							<div className="flex gap-4">
								<Input
									type="text"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Nama Anda"
								/>
								<Input
									type="number"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Nomor HP"
								/>
							</div>
							<div className="flex gap-4 w-full">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-full h-[60px] justify-start text-left font-normal rounded-sm text-base",
												!date && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={date}
											onSelect={setDate}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<Input
									type="number"
									className="bg-white text-black text-base rounded-sm h-[60px]"
									placeholder="Jumlah Orang"
								/>
							</div>
							<Textarea
								placeholder="Special Request"
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

export default Reservasi;
