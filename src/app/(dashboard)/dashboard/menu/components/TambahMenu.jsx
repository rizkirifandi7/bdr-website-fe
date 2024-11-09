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
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatDateToISO } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama: z.string().nonempty("Nama harus diisi."),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	gambar: z.any(),
	kategori: z.any(),
	harga: z.any(),
});

const TambahMenu = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			deskripsi: "",
			gambar: "",
			kategori: "",
			harga: "",
		},
	});

	const handleTambah = async (data) => {
		try {
			console.log(data);
			// const formData = new FormData();
			// formData.append("judul", data.judul);
			// formData.append("deskripsi", data.deskripsi);
			// formData.append("gambar", data.gambar[0]);
			// formData.append("tanggal", data.tanggal);

			// const response = await axios.post(
			// 	"http://localhost:8000/post",
			// 	formData,
			// 	{
			// 		headers: {
			// 			"Content-Type": "multipart/form-data",
			// 		},
			// 	}
			// );

			// if (response.status === 201) {
			// 	toast.success("Berita berhasil ditambahkan");
			// 	form.reset();
			// 	setOpenTambah(false);
			// 	fetchData();
			// }
		} catch (error) {
			console.error("Error adding berita:", error);
			toast.error("Gagal menambahkan berita");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button className="bg-[#E76F4F]">
					<PlusCircle />
					Tambah Menu
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Menu</DialogTitle>
					<DialogDescription>Tambahkan menu baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama..."
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
							name="deskripsi"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Deskripsi</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan deskripsi..."
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
							name="harga"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Harga</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan harga..."
											{...field}
											type="number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="kategori"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kategori</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="kategori" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="makanan">Makanan</SelectItem>
												<SelectItem value="minuman">Minuman</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-y-2">
							<Label className="">Gambar</Label>
							<Input
								type="file"
								className="shadow-none h-full py-1.5"
								onChange={(e) => form.setValue("gambar", e.target.files)}
							/>
						</div>
						<DialogFooter>
							<Button type="submit" className="w-full mt-2">
								Submit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahMenu;
