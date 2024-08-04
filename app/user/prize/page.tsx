import PrizeOrders from "@/components/PrizeOrders";
import { getAllPrizes } from "@/lib/actions/prize.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Draw History`,
};

const Prize = async () => {
	let data = await getAllPrizes();

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<PrizeOrders prizes={data} />
		</main>
	);
};

export default Prize;
