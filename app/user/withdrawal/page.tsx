import React from "react";
import { Metadata } from "next";
import WithdrawalNav from "@/components/user-withdrawal/WithdrawalNav";
import WithdrawAccount from "@/components/user-withdrawal/WithdrawAccount";

export const metadata: Metadata = {
	title: `Apply withdrawal`,
};

const HotGoods = () => {
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative text-sm">
			<WithdrawalNav />
			<WithdrawAccount />
		</main>
	);
};

export default HotGoods;
