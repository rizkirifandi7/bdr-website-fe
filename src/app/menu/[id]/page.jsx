"use client";

import { useParams } from "next/navigation";
import React from "react";

const DetailMenuPage = () => {
	const { id } = useParams();

	return (
		<div className="min-h-screen">
			<p className="pt-20">menu id : {id}</p>
		</div>
	);
};

export default DetailMenuPage;
