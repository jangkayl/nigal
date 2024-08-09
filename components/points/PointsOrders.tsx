"use client";
import { pointsGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PointsOrdersProps {
	filteredGoods: typeof pointsGoodsData.prices;
	clicked: boolean;
}

const PointsOrders = ({ filteredGoods, clicked }: PointsOrdersProps) => {
	const router = useRouter();

	const handleClick = (index: number) => {
		router.push(`/points/detail/${index}`);
	};

	return (
		<div className="py-3 flex justify-center items-center pb-[6rem]">
			<div className={`${clicked ? "hidden" : "block"} grid grid-cols-2 gap-3`}>
				{filteredGoods.map((item, index) => (
					<button
						key={index}
						className="border shadow-md bg-white rounded-md w-[10.5rem]"
						onClick={() => handleClick(item.index)}>
						<div className="h-auto w-[full]">
							<Image
								src={item.image}
								alt="promo"
								width="0"
								height="0"
								sizes="100vw"
								placeholder="blur"
								className="w-full"
								quality={100}
							/>
						</div>
						<div className="text-start py-3 px-4">
							<p className="text-sm">{item.title}</p>
							<p className="text-red-700 font-semibold">{item.price}</p>
							<p className="text-xs text-gray-400">Sold 696969</p>
						</div>
					</button>
				))}
			</div>
			<div
				className={`${
					clicked ? "blocked" : "hidden"
				} flex flex-col w-full border-y`}>
				{filteredGoods.map((item, index) => (
					<button
						key={index}
						className="border-b bg-white flex w-full p-3"
						onClick={() => handleClick(item.index)}>
						<div className="h-auto w-[6rem]">
							<Image
								src={item.image}
								alt="promo"
								width="0"
								height="0"
								sizes="100vw"
								placeholder="blur"
								className="w-full"
								quality={100}
							/>
						</div>
						<div className="text-start py-3 px-4">
							<p className="text-sm">{item.title}</p>
							<p className="text-red-700 font-semibold">{item.price}</p>
							<p className="text-xs text-gray-400">Sold 696969</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default PointsOrders;
