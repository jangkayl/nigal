import OrderNav from "@/components/detail/OrderNav";
import PrizeOrders from "@/components/user-prize/PrizeOrders";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Game Bet Now`,
};

const Submit = async () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<OrderNav />
			<PrizeOrders />
		</main>
	);
};

export default Submit;
