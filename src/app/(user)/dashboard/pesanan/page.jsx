"use client";

import * as React from "react";
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { formatRupiah } from "@/lib/formatRupiah";

const PagePesanan = () => {
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [dataUser, setDataUser] = React.useState([]);
	const [openHapus, setOpenHapus] = React.useState(false);
	const [openDetail, setOpenDetail] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);
	const [selectedRowData, setSelectedRowData] = React.useState(null);

	const handleDelete = async () => {
		const response = await axios.delete(
			`http://localhost:8000/api/pesanan/${selectedId}`
		);

		if (response.status === 200) {
			toast.success("Data berhasil dihapus.");
			fetchDataPesanan();
			setOpenHapus(false);
		} else {
			toast.error("Terjadi kesalahan.");
		}
	};

	const columns = [
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
			cell: ({ row }) => <div>{row.getValue("status")}</div>,
		},
		{
			accessorKey: "order_time",
			header: "Tanggal",
			cell: ({ row }) => (
				<div className="capitalize">
					{new Date(row.getValue("order_time")).toLocaleDateString("id-ID", {
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
						<div className="">
							<Dialog
								open={openDetail}
								onOpenChange={(isOpen) => {
									setOpenDetail(isOpen);
									if (isOpen) {
										setSelectedRowData(rowData);
									}
								}}
							>
								<DialogTrigger asChild>
									<Button variant="outline" className="shadow-none">
										Lihat Detail
									</Button>
								</DialogTrigger>
								{selectedRowData && (
									<DialogContent className="sm:max-w-[485px]">
										<DialogHeader>
											<DialogTitle>Detail Pesanan</DialogTitle>
											<DialogDescription>
												Detail pesanan untuk ID {selectedRowData.id}
											</DialogDescription>
										</DialogHeader>
										<div className="flex flex-col gap-4 h-[500px] overflow-y-auto scrollbar-hide">
											<div className="flex justify-between items-center bg-orange-50 border border-headingText px-4 py-2 rounded-lg">
												<p className="text-sm">Tipe Order</p>
												<p className="border border-headingText py-1 px-2 bg-white rounded-lg text-xs">
													{selectedRowData.mode}
												</p>
											</div>
											<div className="flex justify-between items-center border rounded-lg p-4">
												<div className="text-start">
													<p className="text-sm text-gray-500">Nomor Meja</p>
													<p className="text-sm font-semibold">
														{selectedRowData.id_meja}
													</p>
												</div>
												<div className=" text-end">
													<p className="text-sm text-gray-500">Tanggal</p>
													<p className="text-sm font-semibold">
														{new Date(
															selectedRowData.order_time
														).toLocaleDateString("id-ID", {
															weekday: "long",
															year: "numeric",
															month: "long",
															day: "numeric",
														})}
													</p>
												</div>
											</div>
											<div className="border p-4 rounded-lg">
												<h1>Order Item</h1>
												{selectedRowData.item_pesanan.map((item, index) => (
													<div
														key={index}
														className="flex justify-between items-center gap-2"
													>
														<div className="flex items-center gap-3 w-[300px] h-[120px]">
															<Image
																src={`http://localhost:8000/api/menu/view/${item.menu.gambar}`}
																width={80}
																height={80}
																alt="menu"
																className="rounded-md"
															/>
															<div className="flex flex-col justify-between gap-1">
																<h1 className="font-semibold xs:text-sm md:text-base">
																	{item.menu.nama_menu}
																</h1>
																<p className="xs:text-xs md:text-sm text-gray-500">
																	{item.menu.kategori.nama_kategori}
																</p>
																<p className="xs:text-sm md:text-base">
																	{item.jumlah}x
																</p>
															</div>
														</div>
														<div className="flex flex-col justify-between items-end gap-4">
															<p className="font-semibold text-base">
																{formatRupiah(item.menu.harga)}
															</p>
														</div>
													</div>
												))}
											</div>
											<div className="p-4 border rounded-lg">
												<h1 className="font-semibold text-lg mb-2">
													Payment Details
												</h1>
												<div className="flex flex-col gap-2">
													<div className="flex justify-between items-center gap-2">
														<p className="text-base">Subtotal</p>
														<p className="text-base">
															{formatRupiah(
																selectedRowData.item_pesanan.reduce(
																	(acc, item) => {
																		return acc + item.jumlah * item.menu.harga;
																	},
																	0
																)
															)}
														</p>
													</div>
													<div className="flex justify-between items-center gap-2">
														<p className="text-base">Discount</p>
														<p className="text-base">
															{formatRupiah(
																selectedRowData.total - selectedRowData.total
															)}
														</p>
													</div>
													<div className="flex justify-between items-center gap-2">
														<p className="text-base">Service Charge (5%)</p>
														<p className="text-base">
															{formatRupiah(
																selectedRowData.item_pesanan.reduce(
																	(acc, item) => {
																		return (
																			acc + item.jumlah * item.menu.harga * 0.05
																		);
																	},
																	0
																)
															)}
														</p>
													</div>
													<div className="flex justify-between items-center gap-2 mt-2 border-t">
														<p className="text-base font-bold mt-4">Total</p>
														<p className="font-bold text-base mt-4">
															{formatRupiah(selectedRowData.total)}
														</p>
													</div>
												</div>
											</div>
										</div>
										<DialogFooter>
											<Button
												variant="outline"
												className="w-full"
												onClick={() => setOpenDetail(false)}
											>
												Batal
											</Button>
										</DialogFooter>
									</DialogContent>
								)}
							</Dialog>
						</div>
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
			},
		},
	];

	const table = useReactTable({
		data: dataUser,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const fetchDataPesanan = async () => {
		const response = await axios.get("http://localhost:8000/api/pesanan");
		setDataUser(response.data.data);
	};

	React.useEffect(() => {
		fetchDataPesanan();
	}, []);

	return (
		<div className="w-full">
			<h1 className="font-bold text-2xl">Dashboard Pesanan</h1>
			<div className="flex items-center py-4 gap-2">
				<Input
					placeholder="Cari nomor meja..."
					value={table.getColumn("id_meja")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("id_meja")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PagePesanan;
