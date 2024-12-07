"use client";
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

	const getColor = (value) => {
		switch (value) {
			case "completed":
				return "green";
			case "pending":
				return "orange";
			case "preparing":
				return "blue";
			case "canceled":
				return "red";
			default:
				return "black";
		}
	};

	return (
		<Select value={status} onValueChange={handleChange}>
			<SelectTrigger
				className="w-[180px]"
				style={{
					color: getColor(status),
					borderColor: getColor(status),
					borderWidth: "1px",
					borderStyle: "solid",
				}}
			>
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="completed" style={{ color: "green" }}>
					Completed
				</SelectItem>
				<SelectItem value="pending" style={{ color: "orange" }}>
					Pending
				</SelectItem>
				<SelectItem value="preparing" style={{ color: "blue" }}>
					Preparing
				</SelectItem>
				<SelectItem value="canceled" style={{ color: "red" }}>
					Canceled
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default UpdatePesananStatus;
