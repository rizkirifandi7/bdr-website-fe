"use client";
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateToISO } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_pelanggan: z.string().nonempty("Nama pelanggan harus diisi."),
	kontak: z.string().nonempty("Kontak harus diisi."),
	tanggal_reservasi: z.any(),
	jumlah_orang: z.any(),
});

const TambahJadwal = ({ fetchJadwalData }) => {
	const [openTambah, setOpenTambah] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_pelanggan: "",
			kontak: "",
			tanggal_reservasi: null,
			jumlah_orang: 1,
		},
	});

	const handleTambah = async (data) => {
		try {
			const formData = {
				nama_pelanggan: data.nama_pelanggan,
				kontak: data.kontak,
				tanggal_reservasi: data.tanggal_reservasi.toISOString(),
				jumlah_orang: data.jumlah_orang,
			};

			const response = await axios.post(
				"http://localhost:8000/api/reservasi",
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === true) {
				toast.success("Reservasi berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchJadwalData();
			}
		} catch (error) {
			console.error("Error adding reservasi:", error);
			toast.error("Gagal menambahkan reservasi");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button className="bg-[#E76F4F] py-5 md:py-6 text-base w-fit md:w-full">
					<Plus />
					Tambah Reservasi
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[350px]">
				<DialogHeader className="text-start">
					<DialogTitle>Tambah Reservasi</DialogTitle>
					<DialogDescription>Tambah reservasi baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama_pelanggan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Pelanggan</FormLabel>
									<FormControl>
										<Input
											className="shadow-none w-full"
											placeholder="masukkan nama pelanggan..."
											{...field}
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="kontak"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kontak</FormLabel>
									<FormControl>
										<Input
											className="shadow-none w-full"
											placeholder="masukkan kontak..."
											{...field}
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tanggal_reservasi"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Tanggal Reservasi</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														formatDateToISO(field.value, "PPP")
													) : (
														<span>Pilih tanggal</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date("1900-01-01")}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="jumlah_orang"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jumlah Orang</FormLabel>
									<FormControl>
										<Input
											className="shadow-none w-[320px] md:w-full"
											placeholder="masukkan jumlah orang..."
											{...field}
											type="number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="w-full md:w-full mt-2">
								Submit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahJadwal;
