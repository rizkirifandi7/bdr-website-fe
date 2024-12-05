/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_menu: z.string().nonempty("Nama harus diisi."),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	gambar: z.any(),
	nama_kategori: z.any(),
	harga: z.any(),
});

const UpdateMenu = ({ fetchDataMenu, id, rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [dataKategori, setDataKategori] = useState([]);

	const fetchDataKategori = useCallback(async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kategori`);
		const data = await response.json();
		setDataKategori(data.data);
	}, []);

	useEffect(() => {
		fetchDataKategori();
	}, [fetchDataKategori]);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_menu: rowData.nama_menu,
			deskripsi: rowData.deskripsi,
			gambar: rowData.gambar,
			nama_kategori: rowData.kategori,
			harga: rowData.harga,
		},
	});

	const handleUpdate = async (data) => {
		try {
			const formData = new FormData();
			formData.append("nama_menu", data.nama_menu);
			formData.append("deskripsi", data.deskripsi);
			formData.append("gambar", data.gambar[0]);
			formData.append("nama_kategori", data.nama_kategori);
			formData.append("harga", data.harga);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`,
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.status === 200) {
				toast.success("Menu berhasil diupdate");
				form.reset();
				setOpenTambah(false);
				fetchDataMenu();
			}
		} catch (error) {
			console.error("Error adding menu:", error);
			toast.error("Gagal menambahkan menu");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<MdOutlineEdit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Menu</DialogTitle>
					<DialogDescription>Update menu baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama_menu"
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
							name="nama_kategori"
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
												{dataKategori.map((kategori) => {
													return (
														<SelectItem
															key={kategori.id}
															value={kategori.nama_kategori}
														>
															{kategori.nama_kategori}
														</SelectItem>
													);
												})}
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

export default UpdateMenu;
