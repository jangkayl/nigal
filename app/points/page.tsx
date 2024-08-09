import React from "react";
import { Metadata } from "next";
import PointsBalance from "@/components/points/PointsBalance";

export const metadata: Metadata = {
	title: `Points redemption mall`,
};

const Points = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 gap-5 relative">
			<div className="pb-1 border-b bg-white fixed top-0 max-w-sm w-full">
				<p className="py-4 w-full text-center bg-white text-sm">
					Points exchange zone
				</p>
			</div>
			<PointsBalance />
		</main>
	);
};

export default Points;
