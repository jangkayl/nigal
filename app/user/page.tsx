import { auth } from "@/auth";
import TopUp from "@/components/TopUp";
import UserDashboard from "@/components/UserDashboard";
import UserInfo from "@/components/UserInfo";
import { getUserById } from "@/lib/actions/user.action";
import { userType } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: `Account`,
};

const User = async () => {
	const session = await auth();
	let user: userType | null = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 gap-5 relative">
			<p className="py-4 bg-sky-300 w-full text-center text-white fixed top-0 max-w-sm">
				Account
			</p>
			<UserInfo user={user} />
			<TopUp />
			<UserDashboard />
		</main>
	);
};

export default User;
