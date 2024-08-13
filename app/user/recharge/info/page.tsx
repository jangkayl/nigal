import React from "react";
import { Metadata } from "next";
import RechargeNavbar from "@/components/user-recharge/RechargeNavbar";
import RechargeInfo from "@/components/user-recharge/RechargeInfo";

export const metadata: Metadata = {
	title: `Confirm withdrawal`,
};

const RechargeFillup = () => {
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative text-sm">
			<RechargeNavbar />
			<RechargeInfo />
		</main>
	);
};

export default RechargeFillup;
