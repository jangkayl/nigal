import UserButtons from "@/components/UserButtons";
import UserDetails from "@/components/UserDetails";
import { getUserById } from "@/lib/actions/user.action";
import React from "react";

const UserData = async ({ params }: any) => {
	const user = await getUserById(params.id);
	console.log(user);
	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-gray-100 gap-5">
			<UserDetails user={user} />
			<UserButtons />
		</main>
	);
};

export default UserData;
