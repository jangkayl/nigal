"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const OrderSuccess = () => {
	const router = useRouter();

	return (
		<div className="w-full flex flex-col gap-2 text-sm">
			<div className="py-3 bg-white flex justify-center items-center">
				<IoIosArrowBack
					size={20}
					className="cursor-pointer absolute left-3"
					onClick={() => router.push("/order")}
				/>
				<p>Order details</p>
			</div>
			<div className="px-3 py-3 bg-white">
				<p className="font-semibold">
					Seller has not send product yet, please kindly wait
				</p>
				<p className="text-xs">2024-08-05 17:36:52</p>
			</div>
			<div className="px-3 py-3 bg-white">
				<p className="">1 Item</p>
				<p className="text-xs">2024-08-05 17:36:52</p>
			</div>
		</div>
	);
};

export default OrderSuccess;
