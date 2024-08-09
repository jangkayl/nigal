"use client";
import { allGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AllGoods = () => {
	const router = useRouter();

	const handleClick = (index: number) => {
		router.push(`/detail/${index + 1}`);
	};

	return (
		<div className="py-3 flex justify-center items-center">
			<div className="grid grid-cols-2 gap-3">
				{allGoodsData.prices.map((item, index) => (
					<button
						key={index}
						className="border shadow-md rounded-md w-[10.5rem]"
						onClick={() => handleClick(index)}>
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
							<p className="text-red-700">{item.price}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default AllGoods;
