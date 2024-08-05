import PrizeNav from "@/components/user-prize/PrizeNav";
import PrizeOrders from "@/components/user-prize/PrizeOrders";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Draw History`,
};

const Prize = async () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<PrizeNav />
			<PrizeOrders />
		</main>
	);
};

export default Prize;
