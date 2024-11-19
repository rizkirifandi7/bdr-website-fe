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
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nomor_meja: z.string().nonempty("Nama kategori harus diisi."),
	qr_url: z.string().nonempty("QR URL harus diisi."),
});

const TambahMeja = ({ fetchMeja }) => {
	const [openTambah, setOpenTambah] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nomor_meja: "",
			qr_url: "",
		},
	});

	const handleTambah = async (data) => {
		try {
			const formData = new FormData();
			formData.append("nomor_meja", data.nomor_meja);
			formData.append("qr_url", data.qr_url);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/meja`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				toast.success("Kategori Menu berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchMeja();
			}
		} catch (error) {
			console.error("Error adding kategori menu:", error);
			toast.error("Gagal menambahkan kategori menu");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
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
							name="nomor_meja"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nomor Meja</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nomor meja..."
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
							name="qr_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>QR Meja</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama url..."
											{...field}
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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

export default TambahMeja;
