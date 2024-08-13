"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const RechargeNavbar = () => {
	const router = useRouter();
	return (
		<>
			<div className="pt-4 w-full text-center text-sm bg-white fixed top-0 max-w-sm z-10">
				<IoIosArrowBack
					size={20}
					className="cursor-pointer absolute left-3"
					onClick={() => router.back()}
				/>
				<p className="pb-4">Confirm deposit details</p>
			</div>
		</>
	);
};

export default RechargeNavbar;
