"use client";

import * as React from "react";
import axios from "axios";

import TambahUser from "./components/TambahUser";
import UpdateUser from "./components/UpdateUser";
import HapusUser from "./components/HapusUser";
import TableView from "@/components/TableView";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PageUser = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => <div>{row.getValue("nama")}</div>,
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Email
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("email")}</div>
			),
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("role")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateUser
							fetchDataUser={fetchDataUser}
							rowData={rowData}
							id={id}
						/>
						<HapusUser id={id} fetchDataUser={fetchDataUser} />
					</div>
				);
			},
		},
	];

	const fetchDataUser = React.useCallback(async () => {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);

		if (response.status !== 200) {
			toast.error("Error fetching data user");
			return;
		}
		setDataUser(response.data.data);
	}, []);

	React.useEffect(() => {
		fetchDataUser();
	}, [fetchDataUser]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={dataUser}
				fetchData={fetchDataUser}
				TambahComponent={() => <TambahUser fetchDataUser={fetchDataUser} />}
				title="Dashboard User"
				search="nama"
			/>
		</React.Fragment>
	);
};

export default PageUser;
