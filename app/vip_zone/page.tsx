import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `VIP Goods List`,
};

const VipZone = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 gap-5 relative">
			<p className="py-4 bg-sky-300 w-full text-center text-white">Account</p>
		</main>
	);
};

export default VipZone;
