import { redirect } from "next/navigation";
import React from "react";
import UserProfile from "./UserProfile";
import { userType } from "@/types";

interface UserProfileProps {
	user: userType | null;
}

const UserInfo = ({ user }: UserProfileProps) => {
	if (!user) redirect("/sign-in");
	return (
		<div className="w-full px-5 pt-[5rem]">
			<div className="bg-white w-full h-48 rounded-md">
				<UserProfile user={user} />
				<div className="grid grid-cols-2 pt-5 max-w-[20rem] mx-auto">
					<div className="text-center">
						<p className="text-2xl">{user.balance}</p>
						<p className="text-sm text-gray-400">Available balance (₱)</p>
					</div>
					<div className="text-center">
						<p className="text-2xl">{user.points}</p>
						<p className="text-sm text-gray-400">My Points</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
