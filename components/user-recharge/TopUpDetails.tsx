import { getCreditById } from "@/lib/actions/user.action";
import { formatDateTime } from "@/lib/utils";
import { userCreditType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
	userId: string;
}

const TopUpDetails = ({ userId }: Props) => {
	const [credits, setCredits] = useState<userCreditType[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchCredits = async () => {
			const result = await getCreditById(userId);
			if (result) {
				const transformedCredits: userCreditType[] = result.map((credit) => ({
					userId: credit.userId,
					orderNo: credit.orderNum,
					amount: credit.amount,
					status: credit.status ?? false,
					createdAt: credit.createdAt,
					bonus: credit.bonus,
				}));

				setCredits(transformedCredits);
			}
		};

		fetchCredits();
	}, [userId]);

	const extractLastPart = (uuid: string) => {
		const parts = uuid.split("-");
		return parts[parts.length - 1];
	};

	const isApplicationFailed = (createdAt: Date) => {
		const now = new Date();
		const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
		return createdAt < fiveMinutesAgo;
	};

	console.log(credits);

	return (
		<div className="mt-4 bg-white px-3 text-xs">
			<div className="flex flex-col items-center w-full py-3 border-b-2 border-sky-400">
				<p className="text-sm">Top up application details</p>
			</div>
			<p className="text-red-500 py-2">
				* If it takes more than 10 minutes without success, you can send a
				screenshot of the order number and transaction details to cs
			</p>
			{credits.map((credit, index) => (
				<div
					className="py-2 flex flex-col gap-2 mb-3 border-b border-dashed border-gray-400 relative"
					key={index}>
					<p>Order number: {extractLastPart(credit.orderNo)}</p>
					<p>Application time: {formatDateTime(credit.createdAt)}</p>
					<p>Top up amount: {credit.amount}</p>
					<p>
						Top up status:{" "}
						<span
							className={`${
								credit.status
									? "text-green-600"
									: isApplicationFailed(credit.createdAt)
									? "text-red-600"
									: "text-black"
							}`}>
							{credit.status
								? "Application success"
								: isApplicationFailed(credit.createdAt)
								? "Application failed"
								: "Reviewing"}
						</span>
					</p>
					{!credit.status && !isApplicationFailed(credit.createdAt) && (
						<button
							className="border p-1 border-sky-300 absolute bottom-1 right-6"
							onClick={() =>
								router.push(
									`/user/recharge/info?amount=${credit.amount}&bonus=${credit.bonus}&id=${credit.userId}&order=${credit.orderNo}`
								)
							}>
							Continue Top-up
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default TopUpDetails;
