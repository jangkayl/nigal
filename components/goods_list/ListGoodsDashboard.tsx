"use client";
import { allGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
	up: boolean;
	down: boolean;
}

const ListGoodsDashboard = ({ up, down }: Props) => {
	const router = useRouter();

	// Function to sort data based on price
	const sortDataByPrice = () => {
		return allGoodsData.prices
			.filter((goods) => goods.title === "Cash 2x returns")
			.sort((a, b) => {
				if (up) {
					return a.cost - b.cost; // Sort in ascending order
				}
				if (down) {
					return b.cost - a.cost; // Sort in descending order
				}
				return 0; // No sorting if neither up nor down is true
			});
	};

	const sortedData = sortDataByPrice();

	return (
		<div className="pt-[5rem] pb-3 grid grid-cols-2">
			{sortedData.map((goods, index) => (
				<button
					onClick={() =>
						router.push(`/detail/${index >= 2 ? index + 3 : index + 1}`)
					}
					key={index}
					className="py-3 text-sm cursor-pointer flex justify-center items-center">
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
