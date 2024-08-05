import { auth } from "@/auth";
import UserDetails from "@/components/user-data/UserDetails";
import { getUserById } from "@/lib/actions/user.action";
import { userType } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: `User Profile`,
};

const UserData = async () => {
	const session = await auth();
	let user: userType | null = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 gap-5">
			<UserDetails user={user} />
		</main>
	);
};

export default UserData;
