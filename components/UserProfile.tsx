"use client";
import { userType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface UserProfileProps {
	user: userType;
}

const UserProfile = ({ user }: UserProfileProps) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleProfile = () => {
		setOpen(!open);
	};

	return (
		<div className="pt-6 px-6 flex items-center gap-4 text-sm">
			<div className="w-16 h-auto">
				<Image
					src={user?.image}
					alt="profile"
					width="0"
					height="0"
					sizes="100vw"
					priority={true}
					className="rounded-full border-sky-500 border shadow-lg shadow-sky-500 cursor-pointer w-[10rem] h-auto"
					onClick={handleProfile}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p>{user.name}</p>
				<p className="flex items-center gap-1">
					ID: {user.uid}
					<CiEdit
						size={20}
						className="cursor-pointer text-gray-500"
						onClick={() => router.push("/user/data/")}
					/>
				</p>
			</div>
			<Modal
				open={open}
				setOpen={setOpen}
				userId={user.id}
				currentImg={user.image}
			/>
		</div>
	);
};

export default UserProfile;
