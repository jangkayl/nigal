import { auth } from "@/auth";
import TopUp from "@/components/TopUp";
import UserDashboard from "@/components/UserDashboard";
import UserInfo from "@/components/UserInfo";
import { getUserById } from "@/lib/actions/user.action";
import { userType } from "@/types";
import React from "react";

interface UserProfileProps {
	user?: userType | null;
}

const User = async () => {
	const session = await auth();
	let user: userType | null = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-gray-100 gap-5">
			<p className="py-4 bg-sky-300 w-full text-center text-white">Account</p>
			<UserInfo user={user} />
			<TopUp />
			<UserDashboard />
		</main>
	);
};

export default User;
