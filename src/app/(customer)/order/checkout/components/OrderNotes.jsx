import { Textarea } from "@/components/ui/textarea";
import React from "react";

const OrderNotes = ({ setNote, note }) => {
	return (
		<div className="bg-white m-4">
			<div className="p-4 border rounded-lg">
				<Textarea
					value={note}
					onChange={(e) => setNote(e.target.value)}
					className="w-full h-[100px] p-2 border rounded"
					placeholder="Catatan..."
				/>
			</div>
		</div>
	);
};

export default OrderNotes;
