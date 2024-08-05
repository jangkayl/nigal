"use client";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaRegRegistered } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
	const router = useRouter();

	return (
		<div className="mt-24 w-full relative">
			<GiCheckMark
				size={70}
				color="white"
				className="p-3 bg-red-500 rounded-full absolute top-[-2.5rem] left-[50%] translate-x-[-50%]"
			/>
			<div className="mx-4 bg-white p-3 pt-10">
				<p className="font-semibold text-center pb-4">Payment succeeded</p>
				<div className="text-sm w-full py-5 border-t border-b gap-1 flex flex-col">
					<div className="flex justify-between">
						<p>Order No.</p>
						<p className="text-gray-500">1231234535235</p>
					</div>
					<div className="flex justify-between">
						<p>Order time</p>
						<p className="text-gray-500">1212312412</p>
					</div>
					<div className="flex justify-between">
						<p>Payment Method</p>
						<p className="text-gray-500">Pay via balance</p>
					</div>
					<div className="flex justify-between">
						<p>Total Amount</p>
						<p className="text-gray-500">5.00</p>
					</div>
				</div>
				<button
					className="flex items-center justify-center w-full bg-red-500 rounded-full text-white py-3 mt-5"
					onClick={() => router.push("/order/game")}>
					HOT SPOT
					<FaRegRegistered size={15} />
				</button>
			</div>
		</div>
	);
};

export default PaymentSuccess;
