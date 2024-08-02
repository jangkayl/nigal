"use client";
import { SignOut } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import React from "react";

const UserButtons = () => {
	const router = useRouter();
	return (
		<div className="py-4 w-full max-w-sm gap-6 text-center flex flex-col fixed bottom-5">
			<button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 outline-none hover:bg-gradient-to-br rounded-lg p-3 text-center">
				Save changes
			</button>
			<form
				action={SignOut}
				className="w-full">
				<button
					className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 outline-none rounded-lg p-3 text-center"
					onClick={() => router.push("/")}>
					Signout
				</button>
			</form>
		</div>
	);
};

export default UserButtons;
