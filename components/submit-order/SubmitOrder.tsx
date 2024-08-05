"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import SubmitItem from "./SubmitItem";
import allGoodsData from "@/lib/sample-data";
import PaymentMethod from "./PaymentMethod";
import { userType } from "@/types";

interface UserProps {
	user: userType | null;
}

const SubmitOrder = ({ user }: UserProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const winrate = parseFloat(searchParams.get("winrate") || "0");
	const count = parseInt(searchParams.get("count") || "0", 10);
	const cost = parseFloat(searchParams.get("cost") || "0");
	const dataIndex = parseInt(searchParams.get("dataIndex") || "0");
	const data = allGoodsData.prices[dataIndex];

	return (
		<div className="w-full">
			<div className="py-4 w-full text-center relative text-sm bg-white">
				<IoIosArrowBack
					size={17}
					className="cursor-pointer absolute left-3"
					onClick={() => router.back()}
				/>
				<p>Submit Order</p>
			</div>
			<SubmitItem
				count={count}
				data={data}
			/>
			<PaymentMethod
				user={user}
				cost={cost}
			/>
		</div>
	);
};

export default SubmitOrder;
