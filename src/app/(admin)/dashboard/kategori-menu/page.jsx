"use client";

import * as React from "react";
import axios from "axios";

import UpdateKategoriMenu from "./components/UpdateKategoriMenu";
import TambahKategoriMenu from "./components/TambahKategoriMenu";
import TableView from "@/components/TableView";
import HapusKategori from "./components/HapusKategori";

const PageMenu = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama_kategori",
			header: "Kategori Menu",
			cell: ({ row }) => (
				<div className="capitalize w-[200px] overflow-x-auto">
					{row.getValue("nama_kategori")}
				</div>
			),
		},
		{
			accessorKey: "createdAt",
			header: "Tanggal",
			cell: ({ row }) => (
				<div className="capitalize w-[200px] overflow-x-auto">
					{new Date(row.getValue("createdAt")).toLocaleDateString("id-ID", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
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
						<UpdateKategoriMenu
							fetchDataKategoriMenu={fetchDataKategoriMenu}
							id={id}
							rowData={rowData}
						/>
						<HapusKategori
							id={id}
							fetchDataKategoriMenu={fetchDataKategoriMenu}
						/>
					</div>
				);
			},
		},
	];

	const fetchDataKategoriMenu = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/kategori`
			);
			setData(response.data.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	React.useEffect(() => {
		fetchDataKategoriMenu();
	}, [fetchDataKategoriMenu]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => (
					<TambahKategoriMenu fetchDataKategoriMenu={fetchDataKategoriMenu} />
				)}
				title="Dashboard Kategori Menu"
				search="nama_kategori"
			/>
		</React.Fragment>
	);
};

export default PageMenu;
