import React from "react";
import { Metadata } from "next";
import OrderList from "@/components/orderList/OrderList";

export const metadata: Metadata = {
	title: `My order`,
};

const Points = async () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<OrderList />
		</main>
	);
};

export default Points;
