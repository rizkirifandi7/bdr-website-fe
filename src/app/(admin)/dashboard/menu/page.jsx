"use client";

import * as React from "react";
import axios from "axios";
import Image from "next/image";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import TambahMenu from "./components/TambahMenu";
import UpdateMenu from "./components/UpdateMenu";
import HapusMenu from "./components/HapusMenu";
import TableView from "@/components/TableView";

const PageMenu = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama_menu",
			header: "Nama Menu",
			cell: ({ row }) => (
				<div className="capitalize w-[200px] overflow-x-auto">
					{row.getValue("nama_menu")}
				</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "deskripsi",
			cell: ({ row }) => (
				<div className="capitalize w-[200px] overflow-x-auto">
					{row.getValue("deskripsi")}
				</div>
			),
		},
		{
			accessorKey: "gambar",
			header: "Gambar",
			cell: ({ row }) => (
				<div className="capitalize rounded-md">
					<Image
						src={row.getValue(
							"gambar"
						)}
						alt={row.getValue("gambar")}
						width={80}
						height={80}
						className="rounded-md w-auto h-auto"
						priority
					/>
				</div>
			),
		},
		{
			accessorKey: "kategori",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Kategori
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("kategori")
						? row.getValue("kategori")
						: "Tidak ada kategori"}{" "}
				</div>
			),
		},
		{
			accessorKey: "harga",
			header: () => <div className="">Harga</div>,
			cell: ({ row }) => {
				const harga = parseFloat(row.getValue("harga"));

				const formatted = new Intl.NumberFormat("id-ID", {
					style: "currency",
					currency: "IDR",
				}).format(harga);

				return <div className="font-medium">{formatted}</div>;
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateMenu
							fetchDataMenu={fetchDataMenu}
							id={id}
							rowData={rowData}
						/>
						<HapusMenu id={id} fetchDataMenu={fetchDataMenu} />
					</div>
				);
			},
		},
	];

	const fetchDataMenu = React.useCallback(async () => {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
		setData(response.data.data);
	}, []);

	React.useEffect(() => {
		fetchDataMenu();
	}, [fetchDataMenu]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahMenu fetchDataMenu={fetchDataMenu} />}
				title="Dashboard Menu"
				search="nama_menu"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageMenu;
