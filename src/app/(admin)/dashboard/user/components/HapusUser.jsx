import React from "react";
import axios from "axios";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";

const HapusUser = ({ id, fetchDataUser }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const handleDelete = async () => {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/user/${selectedId}`
		);

		if (response.status === 200) {
			toast.success("Data berhasil dihapus.");
			fetchDataUser();
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
						<DialogTitle>Hapus User</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus user ini?
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
						<Button
							variant="outline"
							className="w-full"
							onClick={() => setOpenHapus(false)}
						>
							Batal
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HapusUser;
