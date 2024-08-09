import React from "react";
import { Metadata } from "next";
import noItem from "@/public/noItem.png";
import Image from "next/image";

export const metadata: Metadata = {
	title: `VIP Goods List`,
};

const VipZone = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 gap-5 relative">
			<p className="py-4 bg-white w-full text-center text-sm">VIP Zone</p>
			<div className="flex justify-center items-center w-full pt-20">
				<div className="w-[15rem]">
					<Image
						src={noItem}
						width="0"
						height="0"
						sizes="100vw"
						quality={100}
						alt="noImage"
					/>
				</div>
			</div>
		</main>
	);
};

export default VipZone;
