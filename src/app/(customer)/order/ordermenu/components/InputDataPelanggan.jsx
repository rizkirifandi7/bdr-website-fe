import { Button } from "@/components/ui/button";
import {
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const InputDataPelanggan = ({
	typeOrder,
	nameInput,
	tableNumberInput,
	errorMessage,
	handleInputChange,
	handleSaveTableNumber,
}) => {
	return (
		<DrawerContent className="w-full md:w-[480px] mx-auto h-fit pb-5">
			<DrawerHeader>
				<DrawerTitle>{typeOrder}</DrawerTitle>
				<DrawerDescription>
					Please input your data to continue
				</DrawerDescription>
			</DrawerHeader>

			{typeOrder === "Dine In" ? (
				<div>
					<div className="flex flex-col gap-2 m-4">
						<Label>Name</Label>
						<Input
							type="text"
							placeholder="Input Your Name"
							value={nameInput}
							onChange={(e) => handleInputChange(e, "name")}
							className="w-full py-6 border rounded-lg"
						/>
						{errorMessage.name && (
							<p className="text-red-500 text-sm">{errorMessage.name}</p>
						)}
					</div>
					<div className="flex flex-col gap-2 m-4">
						<Label>Table Number</Label>
						<Input
							type="number"
							placeholder="Table number"
							value={tableNumberInput}
							onChange={(e) => handleInputChange(e, "tableNumber")}
							className="w-full py-6 border rounded-lg"
						/>
						{errorMessage.tableNumber && (
							<p className="text-red-500 text-sm">{errorMessage.tableNumber}</p>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2 m-4">
					<Label>Name</Label>
					<Input
						type="text"
						placeholder="Input Your Name"
						value={nameInput}
						onChange={(e) => handleInputChange(e, "name")}
						className="w-full py-6 border rounded-lg"
					/>
					{errorMessage.name && (
						<p className="text-red-500 text-sm">{errorMessage.name}</p>
					)}
				</div>
			)}

			<div className="m-4">
				<Button
					className="w-full py-6 bg-orange-500 text-white hover:bg-orange-400 hover:text-white"
					onClick={handleSaveTableNumber}
				>
					Save
				</Button>
			</div>
		</DrawerContent>
	);
};

export default InputDataPelanggan;
