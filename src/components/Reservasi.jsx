"use client";

import React, { useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";

const Reservasi = () => {
	const [date, setDate] = useState();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [people, setPeople] = useState("");
	const [request, setRequest] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission
		const reservationData = {
			nama_pelanggan: name,
			kontak: phone,
			tanggal_reservasi: date,
			jumlah_orang: people,
			request, // Include request in the reservation data
		};

		createReservation(reservationData);
	};

	const createReservation = async (reservationData) => {
		const response = await axios.post(
			"http://localhost:8000/api/reservasi",
			reservationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 201) {
			toast.success("Reservasi berhasil dibuat.");
			setName("");
			setPhone("");
			setDate(null);
			setPeople("");
			setRequest("");
		} else {
			toast.error("Reservasi gagal dibuat.");
		}
	};

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
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col w-full gap-4 mt-4">
								<div className="flex gap-4">
									<Input
										type="text"
										className="bg-white text-black text-base rounded-sm h-[60px]"
										placeholder="Nama Anda"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<Input
										type="number"
										className="bg-white text-black text-base rounded-sm h-[60px]"
										placeholder="Nomor HP"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
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
												{date ? (
													format(date, "PPP")
												) : (
													<span>Pilih Tanggal</span>
												)}
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
										value={people}
										onChange={(e) => setPeople(e.target.value)}
									/>
								</div>
								<Textarea
									placeholder="Special Request"
									className="bg-white text-black text-base rounded-none h-[100px]"
									value={request}
									onChange={(e) => setRequest(e.target.value)}
								/>
								<Button
									type="submit"
									className="bg-[#FEA92B] text-white h-[60px] rounded-sm mb-3"
								>
									Reservasi
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Reservasi;
