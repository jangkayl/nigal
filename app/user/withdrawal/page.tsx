import React from "react";
import { Metadata } from "next";
import WithdrawalNav from "@/components/user-withdrawal/WithdrawalNav";
import WithdrawAccount from "@/components/user-withdrawal/WithdrawAccount";
import { getSessionUser, getUserById } from "@/lib/actions/user.action";

export const metadata: Metadata = {
	title: `Apply withdrawal`,
};

const HotGoods = async () => {
	let session = await getSessionUser();
	let user = null;

	if (session?.user.id) {
		user = await getUserById(session?.user.id);
	}

	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative text-sm">
			<WithdrawalNav />
			<WithdrawAccount user={user} />
		</main>
	);
};

export default HotGoods;
