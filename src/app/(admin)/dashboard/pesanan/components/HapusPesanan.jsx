"use client"
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const HapusPesanan = ({ fetchDataPesanan, id }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const handleDelete = async () => {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/pesanan/${selectedId}`
		);

		if (response.status === 200) {
			toast.success("Data berhasil dihapus.");
			fetchDataPesanan();
			setOpenHapus(false);
		} else {
			toast.error("Terjadi kesalahan.");
		}
	};

	return (
		<div>
			<Dialog open={openHapus} onOpenChange={setOpenHapus}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shadow-none"
						onClick={() => {
							setSelectedId(id);
						}}
					>
						<FiTrash2 />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Hapus Pesanan</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus pesanan ini?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="destructive"
							className="w-full"
							onClick={() => handleDelete()}
						>
							Hapus
						</Button>
						<div className="w-full" onClick={() => setOpenHapus(false)}>
							<Button variant="outline" className="w-full">
								Batal
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HapusPesanan;
