import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const HapusKategori = ({ id, fetchDataKategoriMenu }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/kategori/${selectedId}`
			);
			if (response.status === 200) {
				toast.success("Kategori menu berhasil dihapus");
				setOpenHapus(false);
				fetchDataKategoriMenu();
			}
		} catch (error) {
			console.error("Error deleting kategori menu:", error);
			toast.error("Gagal menghapus kategori menu");
		}
	};

	return (
		<Dialog open={openHapus} onOpenChange={setOpenHapus}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="shadow-none "
					onClick={() => {
						setSelectedId(id);
					}}
				>
					<FiTrash2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Hapus Kategori Menu</DialogTitle>
					<DialogDescription>
						Apakah anda yakin ingin menghapus kategori menu ini?
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
	);
};

export default HapusKategori;
