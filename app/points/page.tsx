import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Points redemption mall`,
};

const Points = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-gray-100 gap-5 relative">
			<p className="py-4 bg-sky-300 w-full text-center text-white">Account</p>
		</main>
	);
};

export default Points;
