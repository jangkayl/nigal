"use client";
import Image from "next/image";
import React from "react";
import prize from "@/public/prizeopening.png";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
	const router = useRouter();
	return (
		<div className="w-full px-5">
			<div className="bg-white w-full h-28 rounded-md p-3">
				<button
					onClick={() => router.push("/user/prize")}
					className="px-2 py-2 text-center max-w-[7rem] flex flex-col items-center gap-2">
					<Image
						src={prize}
						alt="price"
						width={27}
						height={27}
						quality={100}
					/>
					<p className="text-xs">Prize opening record</p>
				</button>
			</div>
		</div>
	);
};

export default UserDashboard;
