import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `My order`,
};

const Order = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-gray-100 gap-5">
			<div className="py-4 bg-sky-300 w-full text-white text-center relative">
				<p>My Order</p>
			</div>
		</main>
	);
};

export default Order;
