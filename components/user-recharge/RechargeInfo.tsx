"use client";
import {
	addUserCredit,
	getUserById,
	updateAddCredit,
} from "@/lib/actions/user.action";
import { userType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const RechargeInfo = () => {
	const searchParams = useSearchParams();
	const amount = searchParams.get("amount");
	const userId = searchParams.get("id");
	const bonus = searchParams.get("bonus");
	const orderNo = searchParams.get("order");
	const [user, setUser] = useState<userType | null>();
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			if (userId) {
				const userData = await getUserById(userId);
				setUser(userData);
			}
		};

		fetchUser();
	}, [userId]);

	const maskAccountNumber = (accountNumber: string) => {
		return accountNumber.replace(/(\d{3})\d{4}(\d{2})/, "$1***$2");
	};

	const handleSubmit = async () => {
		const amountValue = amount ? parseFloat(amount) : 0;
		const bonusValue = bonus ? parseFloat(bonus) : 0;
		const orderNum = orderNo ? orderNo : "";

		if (user?.id) {
			const newBalance =
				amountValue + amountValue * (bonusValue * 0.01) + user?.balance;
			await updateAddCredit(user.id, orderNum);
			await addUserCredit(user.id, newBalance);
			router.push("/user/recharge");
		}
	};

	return (
		<div className="pt-[4.2rem]">
			<div className="w-full flex flex-col items-center bg-white py-3">
				<p className="pb-3">Please verify the information</p>
				<div className="px-4 text-xs flex flex-col gap-1">
					<p className="border-t border-cyan-400 py-3 text-red-500">
						Send money to any of the following accounts using the bound GCash,
						click on the top right corner to view the tutorial.
					</p>
					<p>Our GCash: 09696969696</p>
					<p>Top up amount: ₱{amount}</p>
					<p>
						My account: {user ? maskAccountNumber(user.phone) : "*********"}
					</p>
					<button
						className="bg-blue-500 text-white text-sm font-semibold w-[15rem] mx-auto py-2 mt-3 rounded-md"
						onClick={handleSubmit}>
						DONE
					</button>
					<p className="text-red-500 py-4 border-b border-gray-400 border-dashed">
						* If it takes more than 15 minutes without success, you can submit a
						screenshot of the transaction details.
					</p>
				</div>
			</div>
		</div>
	);
};

export default RechargeInfo;
