"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import SubmitItem from "./SubmitItem";
import { allGoodsData } from "@/lib/sample-data";
import PaymentMethod from "./PaymentMethod";
import { userType } from "@/types";
import { getSessionUser, getUserById } from "@/lib/actions/user.action";

interface UserProps {
	user: userType | null;
}

const SubmitOrder = ({ user: initialUser }: UserProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const count = parseInt(searchParams.get("count") || "0", 10);
	const cost = parseFloat(searchParams.get("cost") || "0");
	const dataIndex = parseInt(searchParams.get("dataIndex") || "0");
	const predictType = searchParams.get("predictType") || null;
	const data = allGoodsData.prices[dataIndex];
	const [user, setUser] = useState<userType | null>(initialUser);

	useEffect(() => {
		const fetchUserData = async () => {
			const session = await getSessionUser();
			if (session?.user?.id) {
				const updatedUser = await getUserById(session.user.id);
				setUser(updatedUser);
			}
		};
		fetchUserData();
	}, []);

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
				count={count}
				dataIndex={dataIndex}
				data={data}
				predictType={predictType}
			/>
		</div>
	);
};

export default SubmitOrder;
