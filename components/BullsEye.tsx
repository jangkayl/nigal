import { prizeType } from "@/types";
import React from "react";

interface PrizeProps {
	prizes: prizeType[];
}

const BullsEye = ({ prizes }: PrizeProps) => {
	const items = Array.from({ length: 80 }, (_, index) => ({
		number: index + 1,
	}));

	return (
		<div className="w-full max-h-[82vh] overflow-y-auto scrollbar-hide">
			{items.map((item) => {
				const prizeIndex = prizes.findIndex(
					(prize) => prize.number === item.number
				);
				return (
					<div
						key={item.number}
						className="grid grid-cols-3 justify-between mb-2 w-full text-center border-b py-2">
						<p>Number-{item.number}</p>
						<p className="w-[9rem]">
							{prizeIndex !== -1 ? `${prizeIndex + 1} ` : "50 "} times without
						</p>
						<div className="flex items-center justify-center">
							<button className="bg-gray-500 text-white w-16 rounded-md">
								Bet
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default BullsEye;
