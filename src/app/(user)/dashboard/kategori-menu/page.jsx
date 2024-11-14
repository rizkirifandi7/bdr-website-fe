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
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";

import UpdateKategoriMenu from "./components/UpdateKategoriMenu";
import TambahKategoriMenu from "./components/TambahKategoriMenu";

const PageMenu = () => {
	const [data, setData] = React.useState([]);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);

	const fetchDataKategoriMenu = async () => {
		const response = await axios.get(`http://localhost:8000/api/kategori`);
		setData(response.data.data);
	};

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/kategori/${selectedId}`
			);
			if (response.status === 200) {
				toast.success("Kategori menu berhasil dihapus");
				setOpenHapus(false);
				fetchDataKategoriMenu();
			}
		} catch (error) {
			console.error("Error deleting kategori menu:", error);
			toast.error("Gagal menghapus kategori menu");
		}
	};

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
	});

	React.useEffect(() => {
		fetchDataKategoriMenu();
	}, []);

	return (
		<div className="w-full">
			<h1 className="font-bold text-2xl">Dashboard Kategori Menu</h1>
			<div className="flex items-center py-4 gap-2">
				<Input
					placeholder="Cari menu..."
					value={table.getColumn("nama_kategori")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("nama_kategori")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<TambahKategoriMenu fetchDataKategoriMenu={fetchDataKategoriMenu} />
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