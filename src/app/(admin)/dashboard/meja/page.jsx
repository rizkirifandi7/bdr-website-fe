"use client";

import * as React from "react";
import axios from "axios";

import TambahMeja from "./components/TambahMeja";
import UpdateMeja from "./components/UpdateMeja";
import HapusMeja from "./components/HapusMeja";
import TableView from "@/components/TableView";

const PageUser = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const columns = [
		{
			accessorKey: "nomor_meja",
			header: "Nomor Meja",
			cell: ({ row }) => <div>{row.getValue("nomor_meja")}</div>,
		},
		{
			accessorKey: "qr_url",
			header: "QR Meja",
			cell: ({ row }) => <div>{row.getValue("qr_url")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateMeja fetchMeja={fetchMeja} rowData={rowData} id={id} />
						<HapusMeja fetchMeja={fetchMeja} id={id} />
					</div>
				);
			},
		},
	];

	const fetchMeja = React.useCallback(async () => {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meja`);
		setDataUser(response.data.data);
	}, []);

	React.useEffect(() => {
		fetchMeja();
	}, [fetchMeja]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={dataUser}
				title="Dashboard Meja"
				TambahComponent={() => <TambahMeja fetchMeja={fetchMeja} />}
				search={"nomor_meja"}
			/>
		</React.Fragment>
	);
};

export default PageUser;
