import PaymentSuccess from "@/components/detail/PaymentSuccess";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Order created successfully`,
};

const Submit = async () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<PaymentSuccess />
		</main>
	);
};

export default Submit;
