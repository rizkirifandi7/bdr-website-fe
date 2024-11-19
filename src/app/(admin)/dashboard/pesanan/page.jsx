"use client";

import * as React from "react";
import axios from "axios";

import { toast } from "sonner";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import TableView from "@/components/TableView";
import HapusPesanan from "./components/HapusPesanan";
import DetailPesanan from "./components/DetailPesanan";
import UpdatePesananStatus from "./components/UpdatePesananStatus";
import { MdOutlineFileDownload } from "react-icons/md";
import Invoice from "./components/Invoice";
import { BlobProvider } from "@react-pdf/renderer";

const PagePesanan = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const RenderInvoice = ({ rowData }) => <Invoice rowData={rowData} />;

	const columns = [
		{
			accessorKey: "nama_pelanggan",
			header: "Nama Pelanggan",
			cell: ({ row }) => <div>{row.getValue("nama_pelanggan")}</div>,
		},
		{
			accessorKey: "id_meja",
			header: "Nomor Meja",
			cell: ({ row }) => <div>{row.getValue("id_meja")}</div>,
		},
		{
			accessorKey: "mode",
			header: "Tipe Order",
			cell: ({ row }) => <div>{row.getValue("mode")}</div>,
		},
		{
			accessorKey: "item_pesanan",
			header: "Item Pesanan",
			cell: ({ row }) => (
				<div>
					{row.original.item_pesanan.map((item, index) => (
						<div key={index}>
							{item.menu.nama_menu} - {item.jumlah} pcs
						</div>
					))}
				</div>
			),
		},
		{
			accessorKey: "total",
			header: "Total",
			cell: ({ row }) => <div>{row.getValue("total")}</div>,
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => <UpdatePesananStatus row={row} />,
		},
		{
			accessorKey: "order_time",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Tanggal
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{new Date(row.getValue("order_time")).toLocaleDateString("id-ID", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
					,
					{new Date(row.getValue("order_time")).toLocaleTimeString("id-ID", {
						hour: "2-digit",
						minute: "2-digit",
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
						<DetailPesanan rowData={rowData} />
						<HapusPesanan id={id} fetchDataPesanan={fetchDataPesanan} />
						<Button variant="outline" size="icon">
							<BlobProvider document={<RenderInvoice rowData={rowData} />}>
								{({ url, blob }) => (
									<a href={url} target="_blank">
										<MdOutlineFileDownload />
									</a>
								)}
							</BlobProvider>
						</Button>
					</div>
				);
			},
		},
	];

	const fetchDataPesanan = React.useCallback(async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/pesanan`
		);

		if (response.status !== 200) {
			toast.error("Failed to fetch data");
			return;
		}

		setDataUser(response.data.data);
	}, []);

	React.useEffect(() => {
		fetchDataPesanan();
	}, [fetchDataPesanan]);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={dataUser}
				fetchData={fetchDataPesanan}
				title="Dashboard Pesanan"
				search="item_pesanan"
			/>
		</React.Fragment>
	);
};

export default PagePesanan;
