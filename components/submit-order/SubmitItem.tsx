import { detailType } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
	count: number;
	data: detailType;
}

const SubmitItem = ({ count, data }: Props) => {
	return (
		<div className="bg-white my-3 text-sm">
			<div className="w-full border-b py-2  px-4">
				<p>1 Item</p>
			</div>
			<div className="flex justify-between items-center px-4 py-3">
				<div className="flex items-center gap-3">
					<Image
						src={data.image}
						alt="submitImage"
						height={50}
						width={60}
						className="rounded-md"
					/>
					<div className="flex flex-col gap-2">
						<p>{data.title}</p>
						<p className="text-xs text-red-500">₱{data.cost}</p>
					</div>
				</div>
				<p className="text-gray-400">x {count}</p>
			</div>
		</div>
	);
};

export default SubmitItem;
