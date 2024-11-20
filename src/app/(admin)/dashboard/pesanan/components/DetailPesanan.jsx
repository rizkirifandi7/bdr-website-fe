import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogDescription,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/formatRupiah";
import Image from "next/image";
import React from "react";

const DetailPesanan = ({ rowData }) => {
	const [openDetail, setOpenDetail] = React.useState(false);
	const [selectedRowData, setSelectedRowData] = React.useState(null);

	return (
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
								Detail pesanan untuk ID {selectedRowData.code_payment}
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
									<p className="text-sm text-gray-500">Order ID</p>
									<p className="text-sm font-semibold">
										{selectedRowData.code_payment}
									</p>
								</div>
								<div className=" text-end">
									<p className="text-sm text-gray-500">Tanggal</p>
									<p className="text-sm font-semibold">
										{new Date(selectedRowData.order_time).toLocaleDateString(
											"id-ID",
											{
												day: "numeric",
												month: "short",
												year: "numeric",
											}
										)}
										,
										{new Date(selectedRowData.order_time).toLocaleTimeString(
											"id-ID",
											{
												hour: "2-digit",
												minute: "2-digit",
											}
										)}
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
												src={`${process.env.NEXT_PUBLIC_API_URL}/menu/view/${item.menu.gambar}`}
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
							<div className="border p-4 rounded-lg">
								<h1 className="font-semibold">Catatan:</h1>
								<p>{selectedRowData.catatan}</p>
							</div>

							<div className="p-4 border rounded-lg">
								<h1 className="font-semibold text-lg mb-2">Payment Details</h1>
								<div className="flex flex-col gap-2">
									<div className="flex justify-between items-center gap-2">
										<p className="text-base">Subtotal</p>
										<p className="text-base">
											{formatRupiah(
												selectedRowData.item_pesanan.reduce((acc, item) => {
													return acc + item.jumlah * item.menu.harga;
												}, 0)
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
												selectedRowData.item_pesanan.reduce((acc, item) => {
													return acc + item.jumlah * 0;
												}, 0)
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
								Tutup
							</Button>
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</div>
	);
};

export default DetailPesanan;
