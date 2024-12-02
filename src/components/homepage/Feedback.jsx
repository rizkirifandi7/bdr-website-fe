"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
	Card,
	CardHeader,
	CardDescription,
	CardContent,
	CardFooter,
	CardTitle,
	C,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import StarRating from "../StartRating";
import { toast } from "sonner";
import axios from "axios";

export const Feedback = () => {
	const [rating, setRating] = useState(0);
	const [deskripsi, setDeskripsi] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!rating || !deskripsi) {
			toast.error("Semua kolom harus diisi.");
			return;
		}

		const feedbackData = {
			rating,
			deskripsi,
		};

		createFeedback(feedbackData);
	};

	const createFeedback = async (reservationData) => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/feedback`,
			reservationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 201) {
			toast.success("Feedback berhasil dibuat.");
			setRating(0);
			setDeskripsi("");
		} else {
			toast.error("Feedback gagal dibuat.");
		}
	};

	return (
		<section className="min-h-[80vh] pt-32" id="layanan">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col md:flex-row md:justify-between mt-10 px-6">
					<div className="flex flex-col justify-start items-start gap-4">
						<p className=" text-xl text-[#FEA92B] font-custom">Testimoni</p>
						<h1 className="text-4xl md:text-5xl font-bold">
							Feedback Pelanggan
						</h1>
						<div className="w-full mt-4">
							<p className="text-xl">
								Kami sangat menghargai setiap feedback yang anda berikan.
								Berikan kami kritik dan saran untuk membantu kami meningkatkan
								kualitas layanan kami.
							</p>
						</div>
					</div>

					<div className="flex justify-center items-center mt-10 md:mt-0">
						<Card className="w-[550px]">
							<CardHeader>
								<CardTitle>Testimoni</CardTitle>
								<CardDescription>
									Berikan feedback anda mengenai layanan kami.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit}>
									<div className="grid w-full items-center gap-8">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-base">
												Rating
											</Label>
											<StarRating rating={rating} setRating={setRating} />
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="feedback" className="text-base">
												Feedback
											</Label>
											<Textarea
												id="feedback"
												placeholder="Catatan"
												value={deskripsi}
												onChange={(e) => setDeskripsi(e.target.value)}
												className="bg-white text-black text-base rounded-sm h-[200px]"
											/>
										</div>
									</div>
									<Button
										type="submit"
										className="w-full py-6 bg-[#FEA92B] text-white text-base mt-6"
									>
										Submit
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};
