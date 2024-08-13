import React from "react";
import { Metadata } from "next";
import { getSessionUser, getUserById } from "@/lib/actions/user.action";
import Recharge from "@/components/user-recharge/Recharge";
import RechargeTopup from "@/components/user-recharge/RechargeTopup";

export const metadata: Metadata = {
	title: `Deposit application`,
};

const HotGoods = async () => {
	let session = await getSessionUser();
	let user = null;

	if (session?.user.id) {
		user = await getUserById(session?.user.id);
	}

	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative text-sm">
			<Recharge />
			<RechargeTopup user={user} />
		</main>
	);
};

export default HotGoods;
