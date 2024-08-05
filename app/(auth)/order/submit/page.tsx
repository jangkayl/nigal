import { auth } from "@/auth";
import SubmitOrder from "@/components/submit-order/SubmitOrder";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Submit order`,
};

const Submit = async () => {
	const session = await auth();
	let user = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<SubmitOrder user={user} />
		</main>
	);
};

export default Submit;
