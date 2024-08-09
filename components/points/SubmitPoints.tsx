"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { pointsGoodsData } from "@/lib/sample-data";
import { userType } from "@/types";
import { getSessionUser, getUserById } from "@/lib/actions/user.action";
import PointsItemSubmit from "./PointsItemSubmit";
import PointsPaymentMethod from "./PointsPaymentMethod";

interface UserProps {
	user: userType | null;
}

const SubmitPoints = ({ user: initialUser }: UserProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const count = parseInt(searchParams.get("count") || "0", 10);
	const cost = parseFloat(searchParams.get("cost") || "0");
	const dataIndex = parseInt(searchParams.get("dataIndex") || "0");
	const data = pointsGoodsData.prices[dataIndex];
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
			<PointsItemSubmit
				count={count}
				data={data}
			/>
			<PointsPaymentMethod
				user={user}
				cost={cost}
				data={data}
			/>
		</div>
	);
};

export default SubmitPoints;
