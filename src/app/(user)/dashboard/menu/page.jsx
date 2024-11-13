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

import Image from "next/image";
import TambahMenu from "./components/TambahMenu";

import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
import UpdateMenu from "./components/UpdateMenu";

const PageMenu = () => {
	const [data, setData] = React.useState([]);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const fetchDataMenu = async () => {
		const response = await axios.get(`http://localhost:8000/api/menu`);
		setData(response.data.data);
	};

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/menu/${selectedId}`
			);
			if (response.status === 200) {
				toast.success("Berita berhasil dihapus");
				setOpenHapus(false);
				fetchDataMenu();
			}
		} catch (error) {
			console.error("Error deleting berita:", error);
			toast.error("Gagal menghapus berita");
		}
	};

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
						src={`http://localhost:8000/api/menu/view/${row.getValue(
							"gambar"
						)}`}
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
						<Dialog open={openHapus} onOpenChange={setOpenHapus}>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="shadow-none "
									onClick={() => {
										setSelectedId(id);
									}}
								>
									<FiTrash2 />
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Hapus Menu</DialogTitle>
									<DialogDescription>
										Apakah anda yakin ingin menghapus menu ini?
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
		data: data,
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
		initialState: {
			pagination: {
				pageSize: 4,
			},
		},
	});

	React.useEffect(() => {
		fetchDataMenu();
	}, []);

	return (
		<div className="w-full">
			<h1 className="font-bold text-2xl">Dashboard Menu</h1>
			<div className="flex items-center py-4 gap-2">
				<Input
					placeholder="Cari menu..."
					value={table.getColumn("nama_menu")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("nama_menu")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<TambahMenu fetchDataMenu={fetchDataMenu} />
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

export default PageMenu;
