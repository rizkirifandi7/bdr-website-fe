"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, RefreshCcw, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import isBetween from "dayjs/plugin/isBetween";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import TambahJadwal from "./components/TambahJadwal";

dayjs.extend(isBetween);

const PageReservasi = () => {
	const [date, setDate] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(new Date());
	const [dates, setDates] = useState([]);
	const [jadwalData, setJadwalData] = useState([]);
	const [selectedTitles, setSelectedTitles] = useState([]);

	const fetchJadwalData = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/reservasi");
			const data = await response.data.data;
			setJadwalData(data);
			setSelectedTitles(
				Array.from(new Set(data.map((schedule) => schedule.nama_pelanggan)))
			);
		} catch (error) {
			console.error("Error fetching jadwal data:", error);
		}
	};

	const hapusJadwal = async (id) => {
		try {
			await axios.delete(`http://localhost:8000/api/reservasi/${id}`);
			fetchJadwalData();
		} catch (error) {
			console.error("Error deleting jadwal:", error);
		}
	};

	useEffect(() => {
		fetchJadwalData();
	}, []);

	useEffect(() => {
		const daysInMonth = dayjs(currentDate).daysInMonth();
		const firstDayOfMonth = dayjs(currentDate).startOf("month").day();
		const daysInPrevMonth = dayjs(currentDate)
			.subtract(1, "month")
			.daysInMonth();
		const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
			day: daysInPrevMonth - firstDayOfMonth + i + 1,
			month: dayjs(currentDate).subtract(1, "month").month(),
			year: dayjs(currentDate).subtract(1, "month").year(),
			type: "prev",
		}));
		const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
			day: i + 1,
			month: dayjs(currentDate).month(),
			year: dayjs(currentDate).year(),
			type: "current",
		}));
		const nextMonthDays = Array.from(
			{ length: 42 - (prevMonthDays.length + currentMonthDays.length) },
			(_, i) => ({
				day: i + 1,
				month: dayjs(currentDate).add(1, "month").month(),
				year: dayjs(currentDate).add(1, "month").year(),
				type: "next",
			})
		);
		const fullCalendarDays = [
			...prevMonthDays,
			...currentMonthDays,
			...nextMonthDays,
		];

		setDates(fullCalendarDays);
	}, [currentDate]);

	const handlePreviousMonth = () => {
		setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
	};

	const handleNextMonth = () => {
		setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
	};

	const handleReset = () => {
		setCurrentDate(new Date());
	};

	const toggleTitleSelection = (title) => {
		setSelectedTitles((prev) =>
			prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
		);
	};

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4 h-full">
				<div className="flex flex-col gap-2 h-full">
					<h1 className="text-2xl font-bold">Dashboard Reservasi</h1>
					<div className="flex flex-col gap-4 border p-2 rounded-md mt-1">
						<div className="flex flex-col gap-4 justify-center items-center">
							<TambahJadwal fetchJadwalData={fetchJadwalData} />
							<Calendar
								mode="range"
								selected={date}
								onSelect={(date) => setDate(date)}
								className="w-fit md:w-full"
							/>
						</div>
						<div className="flex flex-col gap-2 mt-4">
							<h2 className="text-lg font-semibold">Filter Reservasi</h2>
							{Array.from(
								new Set(jadwalData.map((schedule) => schedule.nama_pelanggan))
							).map((title) => (
								<div
									key={title}
									className="flex items-center justify-between hover:bg-slate-200 px-2 h-fit rounded-md "
								>
									<Label className="flex items-center">
										<Input
											type="checkbox"
											checked={selectedTitles.includes(title)}
											onChange={() => toggleTitleSelection(title)}
											className="h-4 w-4"
										/>
										<span className="ml-2 text-base w-full truncate">
											{title}
										</span>
									</Label>
									<Button
										onClick={() => {
											const scheduleToDelete = jadwalData.find(
												(schedule) => schedule.nama_pelanggan === title
											);
											if (scheduleToDelete) {
												hapusJadwal(scheduleToDelete.id);
											}
										}}
										className="p-0.5 text-black bg-transparent  shadow-none h-fit hover:bg-transparent"
									>
										<Trash />
									</Button>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="w-full h-full">
					<div className="flex items-center justify-between gap-4 mb-2 rounded-md">
						<Button onClick={handleReset} variant="outline">
							<RefreshCcw className="mr-2" />
							Hari ini
						</Button>
						<div className="flex items-center gap-4">
							<Button onClick={handlePreviousMonth} variant="secondary">
								<ChevronLeft />
							</Button>
							<div className="w-fit md:w-[180px]">
								<p className="text-xs md:text-xl font-bold text-center">
									{dayjs(currentDate).format("MMMM YYYY")}
								</p>
							</div>
							<Button onClick={handleNextMonth} variant="secondary">
								<ChevronRight />
							</Button>
						</div>
					</div>
					<div className="grid grid-cols-7">
						{[
							"Minggu",
							"Senin",
							"Selasa",
							"Rabu",
							"Kamis",
							"Jumat",
							"Sabtu",
						].map((day) => (
							<p
								key={day}
								className={`border rounded-md p-1 md:p-4 text-center text-xs md:text-base font-medium ${
									day ? "bg-gray-300 text-black mb-1" : ""
								}`}
							>
								{day}
							</p>
						))}
						{dates.map(({ day, month, year, type }, index) => {
							const schedulesInRange = jadwalData.filter((schedule) => {
								const currentDate = dayjs(`${year}-${month + 1}-${day}`);
								return (
									currentDate.isSame(
										dayjs(schedule.tanggal_reservasi),
										"day"
									) && selectedTitles.includes(schedule.nama_pelanggan)
								);
							});

							return (
								<div
									key={index}
									className={`border rounded-md p-4 h-40 ${
										type !== "current" ? "text-gray-400 bg-slate-100" : ""
									}`}
								>
									<p
										className={`flex flex-col text-center ${
											type === "current" &&
											dayjs().month() === month &&
											dayjs().date() === day
												? "w-fit mx-auto bg-black text-white text-center py-1 px-2 rounded-md"
												: ""
										}`}
									>
										{day}
									</p>
									{schedulesInRange.slice(0, 3).map((schedule, idx) => (
										<Dialog key={idx}>
											<DialogTrigger asChild>
												<button className="flex flex-col text-xs text-start bg-yellow-200 mt-1 p-0.5 rounded-md">
													{schedule.nama_pelanggan}
												</button>
											</DialogTrigger>
											<DialogContent>
												<DialogTitle>Detail Reservasi</DialogTitle>
												<div className="flex flex-col gap-8">
													<div className="flex flex-col gap-1">
														<Label className="text-slate-600 text-base mb-1">
															Nama Pelanggan
														</Label>
														<p className="text-lg font-medium border  p-2 rounded-md">
															{schedule.nama_pelanggan}
														</p>
													</div>
													<div className="flex flex-col gap-1 w-[460px]">
														<Label className="text-slate-600 text-base mb-1">
															Kontak
														</Label>
														<p className="text-lg font-medium border p-2 rounded-md break-words">
															{schedule.kontak}
														</p>
													</div>
													<div className="flex flex-col gap-1">
														<Label className="text-slate-600 text-base mb-1">
															Tanggal Reservasi
														</Label>
														<p className="text-lg font-medium border  p-2 rounded-md">
															{dayjs(schedule.tanggal_reservasi).format(
																"DD MMMM YYYY"
															)}
														</p>
													</div>
													<div className="flex flex-col gap-1">
														<Label className="text-slate-600 text-base mb-1">
															Jumlah Orang
														</Label>
														<p className="text-lg font-medium border  p-2 rounded-md">
															{schedule.jumlah_orang}
														</p>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									))}
									{schedulesInRange.length > 3 && (
										<Popover>
											<PopoverTrigger asChild>
												<button className="flex flex-col text-xs text-center rounded-full p-0.5 mt-2">
													{`Lihat semua ${schedulesInRange.length}`}
												</button>
											</PopoverTrigger>
											<PopoverContent>
												<div className="flex flex-col gap-2">
													{schedulesInRange.map((schedule, idx) => (
														<Dialog key={idx}>
															<DialogTrigger asChild>
																<button className="flex flex-col text-xs text-start bg-yellow-200 mt-1 p-0.5 rounded-md">
																	{schedule.nama_pelanggan}
																</button>
															</DialogTrigger>
															<DialogContent>
																<DialogTitle>Detail Reservasi</DialogTitle>
																<div className="flex flex-col gap-2">
																	<p>
																		<span className="font-semibold">
																			Nama Pelanggan:
																		</span>{" "}
																		{schedule.nama_pelanggan}
																	</p>
																	<p>
																		<span className="font-semibold">
																			Kontak:
																		</span>{" "}
																		{schedule.kontak}
																	</p>
																	<p>
																		<span className="font-semibold">
																			Tanggal Reservasi:
																		</span>{" "}
																		{dayjs(schedule.tanggal_reservasi).format(
																			"DD MMMM YYYY"
																		)}
																	</p>
																	<p>
																		<span className="font-semibold">
																			Jumlah Orang:
																		</span>{" "}
																		{schedule.jumlah_orang}
																	</p>
																</div>
															</DialogContent>
														</Dialog>
													))}
												</div>
											</PopoverContent>
										</Popover>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default PageReservasi;
