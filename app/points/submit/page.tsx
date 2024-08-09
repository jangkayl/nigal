import SubmitPoints from "@/components/points/SubmitPoints";
import { getSessionUser, getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: `Submit Points`,
};

const Submit = async () => {
	const session = await getSessionUser();
	let user = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<SubmitPoints user={user} />
		</main>
	);
};

export default Submit;
