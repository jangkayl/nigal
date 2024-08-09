import { detailType } from "@/types";
import React from "react";

interface Props {
	data: detailType;
	oneBet: boolean;
}

const PointsInfo = ({ data }: Props) => {
	return (
		<div className="p-3 bg-white w-full">
			<div className="flex justify-start items-center gap-2">
				<p className="text-2xl font-semibold text-red-600">
					{data.cost} <span className="text-sm">Points</span>
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="font-semibold">{data.title}</p>
				<div className="flex gap-5 text-[0.8rem] text-gray-500">
					<p>Inventory: 696969</p>
					<p>Sold: 696969</p>
				</div>
			</div>
		</div>
	);
};

export default PointsInfo;
