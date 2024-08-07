import Image from "next/image";
import Link from "next/link";
import React from "react";
import prize from "@/public/prizeopening.png";

const UserDashboard = () => {
	return (
		<div className="w-full px-5">
			<div className="bg-white w-full h-28 rounded-md p-3">
				<Link
					className="px-2 py-2 text-center max-w-[7rem] flex flex-col items-center gap-2"
					href="/user/prize">
					<Image
						src={prize}
						alt="price"
						width={27}
						height={27}
					/>
					<p className="text-xs">Prize opening record</p>
				</Link>
			</div>
		</div>
	);
};

export default UserDashboard;
