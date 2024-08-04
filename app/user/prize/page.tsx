import PrizeOrders from "@/components/PrizeOrders";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Draw History`,
};

const Prize = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100">
			<PrizeOrders />
		</main>
	);
};

export default Prize;
