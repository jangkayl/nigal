import { detailType } from "@/types";
import React from "react";

interface Props {
	data: detailType;
	oneBet: boolean;
}

const DetailInfo = ({ data, oneBet }: Props) => {
	return (
		<div className="p-3 bg-white w-full">
			<div className="flex justify-start items-center gap-2">
				<p className="text-2xl font-semibold text-red-600">
					<span className="text-sm font-normal">₱</span>
					{data.cost}.00
				</p>
				<p className="font-semibold text-black">
					<span className="text-sm font-normal">₱</span>
					{data.cost}.00
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="font-semibold">{data.title}</p>
				<div className="flex gap-5 text-[0.8rem] text-gray-500">
					<p>Original price: {data.price}</p>
					<p>Sold: 696969</p>
				</div>
				<p className="text-[0.8rem] text-red-500">
					Promotion success can be upgraded to goods valued at ₱
					{oneBet ? "71" : data.cost * 2}
					.00 free of charge
				</p>
			</div>
		</div>
	);
};

export default DetailInfo;
