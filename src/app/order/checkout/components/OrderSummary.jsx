import { formatRupiah } from "@/lib/formatRupiah";

const OrderSummary = ({ totalPrice, total, discount, tax }) => {
	return (
		<div className="bg-white m-4">
			<div className="p-4 border rounded-lg">
				<h1 className="font-semibold text-lg mb-2">Payment Details</h1>
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Subtotal</p>
						<p className="text-base">{formatRupiah(totalPrice)}</p>
					</div>
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Discount</p>
						<p className="text-base">{formatRupiah(discount)}</p>
					</div>
					<div className="flex justify-between items-center gap-2">
						<p className="text-base">Service Charge (5%)</p>
						<p className="text-base">{formatRupiah(tax)}</p>
					</div>
					<div className="flex justify-between items-center gap-2 mt-2 border-t">
						<p className="text-base font-bold mt-4">Total</p>
						<p className="font-bold text-base mt-4">{formatRupiah(total)}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
