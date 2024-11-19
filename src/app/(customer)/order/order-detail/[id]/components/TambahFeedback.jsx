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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	rating: z.any(),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
});

const TambahFeedback = ({ order }) => {
	const [openTambah, setOpenTambah] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			id_pesanan: "",
			rating: "",
			deskripsi: "",
		},
	});

	const handleTambah = async (data) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/feedback`,
				{
					id_pesanan: order.id,
					rating: data.rating,
					deskripsi: data.deskripsi,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				form.reset();
				toast.success("Feedback berhasil ditambahkan");
				setOpenTambah(false);
			} else {
				toast.error("Gagal menambahkan feedback");
			}
		} catch (error) {
			console.error("Error adding menu:", error);
			toast.error("Gagal menambahkan menu");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button className="w-full p-6 border bg-white" variant="ghost">
					Feedback
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Feedback</DialogTitle>
					<DialogDescription>
						Please fill out the form below to help us improve.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rating</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="py-6 bg-white">
													<SelectValue placeholder="Rating" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1">1</SelectItem>
												<SelectItem value="2">2</SelectItem>
												<SelectItem value="3">3</SelectItem>
												<SelectItem value="4">4</SelectItem>
												<SelectItem value="5">5</SelectItem>
											</SelectContent>
										</Select>
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
									<FormLabel>Feedback</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Berikan komentar anda..."
											className="bg-white text-black text-base rounded-sm h-[150px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="submit"
								className="w-full mt-2 p-6 bg-orange-400 hover:bg-orange-500"
							>
								Submit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahFeedback;
