"use client";
import { changeNameById, SignOut } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import React from "react";

interface nicknameProps {
	nickname: string;
	id: string;
}

const UserButtons = ({ nickname, id }: nicknameProps) => {
	const router = useRouter();

	const handleSaveChanges = async () => {
		if (id) {
			await changeNameById(id, nickname);
			router.back();
		}
	};

	return (
		<div className="py-4 pt-40 w-full max-w-sm gap-6 text-center flex flex-col items-center">
			<button
				className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 outline-none hover:bg-gradient-to-br rounded-lg p-3 w-[20rem]"
				onClick={handleSaveChanges}>
				Save changes
			</button>
			<form
				action={SignOut}
				className="w-full">
				<button
					className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 outline-none rounded-lg p-3 w-[20rem]"
					onClick={() => router.push("/")}>
					Signout
				</button>
			</form>
		</div>
	);
};

export default UserButtons;
