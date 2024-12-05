"use client";

import * as React from "react";
import TableView from "@/components/TableView";
import axios from "axios";
import HapusFeedback from "./components/HapusFeedback";
import { toast } from "sonner";

const PageFeedback = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const columns = [
		{
			accessorKey: "rating",
			header: "Rating",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("rating")}</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("deskripsi")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				return (
					<div>
						<HapusFeedback id={id} fetchDataFeedback={fetchDataFeedback} />
					</div>
				);
			},
		},
	];

	const fetchDataFeedback = React.useCallback(async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/feedback`
		);

		if (response.status !== 200) {
			toast.error("Failed to fetch data");
			return;
		}

		const reversedData = response.data.data.reverse();
		setDataUser(reversedData);
	}, []);

	React.useEffect(() => {
		fetchDataFeedback();
	}, [fetchDataFeedback]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={dataUser}
				fetchData={fetchDataFeedback}
				title="Dashboard Feedback"
				search="deskripsi"
			/>
		</React.Fragment>
	);
};

export default PageFeedback;
