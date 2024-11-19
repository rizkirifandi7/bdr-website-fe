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

const HapusMenu = ({ id, fetchDataMenu }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/menu/${selectedId}`
			);
			if (response.status === 200) {
				toast.success("Berita berhasil dihapus");
				setOpenHapus(false);
				fetchDataMenu();
			}
		} catch (error) {
			console.error("Error deleting berita:", error);
			toast.error("Gagal menghapus berita");
		}
	};

	return (
		<div>
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
						<DialogTitle>Hapus Menu</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus menu ini?
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

export default HapusMenu;
