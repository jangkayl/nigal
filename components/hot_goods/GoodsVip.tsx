"use client";
import { allGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { PiShoppingCartSimple } from "react-icons/pi";

const GoodsVip = () => {
	const router = useRouter();
	const data = allGoodsData.prices.filter(
		(goods) => goods.title === "VIP5 71x"
	);

	return (
		<div className="pt-16 pb-3 w-full">
			{data.map((goods, index) => (
				<div
					key={index}
					className="px-4 py-3 bg-white border-b flex gap-2 text-sm  relative cursor-pointer"
					onClick={() => router.push(`/detail/${index + 1}`)}>
					<div className="w-[6rem]">
						<Image
							src={goods.image}
							width="0"
							height="0"
							sizes="100vw"
							quality={100}
							alt="noImage"
							className="rounded-md"
						/>
					</div>
					<div className="flex flex-col justify-evenly">
						<p>{goods.title}</p>
						<div>
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
					<div className="absolute bottom-6 right-6 p-1 text-red-500 rounded-full border border-red-500">
						<PiShoppingCartSimple size={15} />
					</div>
				</div>
			))}
		</div>
	);
};

export default GoodsVip;
