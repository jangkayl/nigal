import { detailType } from "@/types";
import React from "react";
import SelectDetail from "./SelectDetail";

interface Props {
	data: detailType;
}

const DetailInfo = ({ data }: Props) => {
	return (
		<div className="p-3">
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
				<p className="font-semibold">Cash 2x return</p>
				<div className="flex justify-between text-[0.8rem] text-gray-500">
					<p>Original price: {data.price}</p>
					<p>Inventory: 696969</p>
					<p>Sold: 696969</p>
				</div>
				<p className="text-[0.8rem] text-red-500">
					Promotion success can be upgraded to goods valued at ₱{data.cost * 2}
					.00 free of charge
				</p>
			</div>
			<SelectDetail />
		</div>
	);
};

export default DetailInfo;
