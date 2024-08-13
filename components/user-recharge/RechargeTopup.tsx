"use client";
import React, { useState } from "react";
import { userType } from "@/types";
import TopUpDetails from "./TopUpDetails";
import { useRouter } from "next/navigation";
import { generateAddCredit } from "@/lib/actions/user.action";

interface Props {
	user: userType | null;
}

const RechargeTopup = ({ user }: Props) => {
	const [selected, setSelected] = useState(0);
	const router = useRouter();
	const amounts = [
		{ amount: 50, bonus: 5 },
		{ amount: 100, bonus: 5 },
		{ amount: 200, bonus: 5 },
		{ amount: 500, bonus: 3 },
		{ amount: 1000, bonus: 3 },
		{ amount: 2000, bonus: 3 },
		{ amount: 5000, bonus: 2 },
		{ amount: 10000, bonus: 2 },
		{ amount: 20000, bonus: 2 },
	];

	const handleTopup = async () => {
		const amount = selected;
		const bonusItem = amounts.find((item) => item.amount === selected);
		const bonus = bonusItem?.bonus || 0;
		console.log("Amount: ", amount);
		console.log("Bonus: ", bonus);
		if (amount !== 0 && user) {
			if (user) {
				const newBalance = amount;
				const orderNo = await generateAddCredit(user.id, newBalance, bonus);
				router.push(
					`/user/recharge/info?amount=${newBalance}&bonus=${bonus}&id=${user.id}&order=${orderNo}`
				);
			}
		}
	};

	return (
		<div className="pt-[4rem] w-full">
			<div className="mx-3 py-3 px-4 bg-white rounded-md pb-6">
				<button className="font-semibold flex justify-center w-full">
					<p className="w-[6rem] pb-1 border-b-2 border-sky-300">Gcash</p>
				</button>
				<p className="text-xs py-2 text-gray-500">
					Please choose the amount and continue
				</p>
				<div className="grid grid-cols-3 w-[20rem] mx-auto gap-2">
					{amounts.map((amount, index) => (
						<button
							key={index}
							onClick={() => setSelected(amount.amount)}
							className={`text-center border w-[6rem] rounded-sm flex flex-col justify-center items-center ${
								selected === amount.amount
									? "border-cyan-400"
									: "border-gray-300"
							}`}>
							<p
								className={`text-lg py-1 border-b border-gray-400 border-dashed w-[5rem] ${
									selected === amount.amount ? "text-cyan-400" : "text-black"
								}`}>
								₱{amount.amount}
							</p>
							<p
								className={`py-1 text-gray-400 ${
									selected === amount.amount
										? "text-yellow-500 font-semibold"
										: "text-gray-400"
								}`}>
								{amount.bonus}%
							</p>
						</button>
					))}
				</div>
				<div className="w-full flex flex-col items-center">
					<p className="text-xs py-3">
						Note: Current balance{" "}
						<span className="text-red-500">₱{user?.balance.toFixed(2)}</span>
					</p>
					<button
						className="w-full mx-auto max-w-[15rem] rounded-lg bg-cyan-400 text-white font-semibold py-2"
						onClick={handleTopup}>
						Confirm top up
					</button>
				</div>
			</div>
			{user && <TopUpDetails userId={user?.id} />}
		</div>
	);
};

export default RechargeTopup;
