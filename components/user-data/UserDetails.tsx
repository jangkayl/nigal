"use client";
import { userType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";
import UserButtons from "./UserButtons";

interface UserDetailsProps {
	user: userType | null;
}

const UserDetails = ({ user }: UserDetailsProps) => {
	const [name, setName] = useState<string>(user?.name ?? "");
	const router = useRouter();

	return (
		<>
			<div className="py-4 bg-sky-300 w-full text-white text-center relative">
				<IoIosArrowBack
					size={20}
					className="cursor-pointer absolute left-3"
					onClick={() => router.back()}
				/>
				<p>User Profile</p>
			</div>
			<div className="w-full px-5 justify-between flex border-b-2 pb-4">
				<p>Nickname</p>
				<input
					type="text"
					className="text-gray-500 text-right max-w-[9rem] bg-transparent outline-none"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="w-full px-5 justify-between flex border-b-2 pb-4">
				<p>ID</p>
				<div className="flex gap-2">
					<p className="text-gray-500 text-right w-auto bg-transparent outline-none">
						{user?.uid}
					</p>
					<RiLock2Line
						size={20}
						className="text-gray-500"
					/>
				</div>
			</div>
			<div className="w-full px-5 justify-between flex border-b-2 pb-4">
				<p>Phone</p>
				<div className="flex gap-2">
					<p className="text-gray-500 text-right w-auto bg-transparent outline-none">
						63{user?.phone}
					</p>
					<RiLock2Line
						size={20}
						className="text-gray-500"
					/>
				</div>
			</div>
			<div className="w-full px-5 justify-between flex border-b-2 pb-4">
				<p>Password</p>
				<button className="flex gap-2">
					<p className="text-gray-500 text-right w-auto bg-transparent outline-none">
						Click change password
					</p>
					<FiChevronRight
						size={25}
						className="text-gray-500"
					/>
				</button>
			</div>
			{user?.id && (
				<UserButtons
					nickname={name}
					id={user?.id}
				/>
			)}
		</>
	);
};

export default UserDetails;
