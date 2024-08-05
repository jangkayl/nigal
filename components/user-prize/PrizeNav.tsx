"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const PrizeNav = () => {
	const router = useRouter();
	return (
		<div className="py-4 w-full text-center relative">
			<IoIosArrowBack
				size={20}
				className="cursor-pointer absolute left-3"
				onClick={() => router.back()}
			/>
			<p>Prize opening record</p>
		</div>
	);
};

export default PrizeNav;
