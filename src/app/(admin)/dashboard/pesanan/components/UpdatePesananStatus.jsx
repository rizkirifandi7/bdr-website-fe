import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const UpdatePesananStatus = ({ row }) => {
	const [status, setStatus] = React.useState(row.getValue("status"));

	const updateStatus = async (id, status) => {
		try {
			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/pesanan/${id}`, {
				status,
			});
			toast.success("Status updated successfully");
		} catch (error) {
			console.error("Error updating status:", error);
			toast.error("Failed to update status");
		}
	};

	const handleChange = async (value) => {
		setStatus(value);
		await updateStatus(row.original.id, value);
	};

	return (
		<Select value={status} onValueChange={handleChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="completed">Completed</SelectItem>
				<SelectItem value="pending">Pending</SelectItem>
				<SelectItem value="preparing">Preparing</SelectItem>
				<SelectItem value="canceled">Canceled</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default UpdatePesananStatus;
