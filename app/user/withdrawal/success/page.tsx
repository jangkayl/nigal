import React from "react";
import { Metadata } from "next";
import Success from "@/components/user-withdrawal/Success";

export const metadata: Metadata = {
	title: `Success Withdrawal`,
};

const SuccessWithdrawal = () => {
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative text-sm items-center pt-5">
			<Success />
		</main>
	);
};

export default SuccessWithdrawal;
