"use client";
import { allGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ListGoodsDashboard = () => {
	const router = useRouter();
	const data = allGoodsData.prices.filter(
		(goods) => goods.title === "Cash 2x returns"
	);

	return (
		<div className="pt-16 pb-3 w-full grid grid-cols-2">
			{data.map((goods, index) => (
				<button
					onClick={() =>
						router.push(`/detail/${index >= 2 ? index + 3 : index + 1}`)
					}
					key={index}
					className="py-3 text-sm cursor-pointer flex justify-center w-full items-center">
					<div className="bg-white max-w-[10.5rem] rounded-b-md pb-1">
						<div className="w-full">
							<Image
								src={goods.image}
								width="0"
								height="0"
								sizes="100vw"
								quality={100}
								alt="noImage"
								className="rounded-t-md"
								placeholder="blur"
							/>
						</div>
						<div className="flex flex-col items-start p-2">
							<p>{goods.title}</p>
							<div className="flex flex-col justify-start items-start">
								<p className="text-red-500 font-semibold text-base">
									<span className="font-normal text-xs">₱</span>
									{goods.cost}.00
								</p>
								<div className="text-xs flex gap-5">
									<p>{goods.price}</p>
									<p className="text-gray-400">Sold: 696969</p>
								</div>
							</div>
						</div>
					</div>
				</button>
			))}
		</div>
	);
};

export default ListGoodsDashboard;
