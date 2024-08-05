import OrderSuccess from "@/components/detail/OrderSuccess";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Order Detail`,
};

const Prize = async () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<OrderSuccess />
		</main>
	);
};

export default Prize;
