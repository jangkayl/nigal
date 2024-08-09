"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuLayoutList, LuLayoutDashboard } from "react-icons/lu";
import PointsOrders from "./PointsOrders";
import { pointsGoodsData } from "@/lib/sample-data";
import Image from "next/image";
import noItem from "@/public/noItem.png";

const PointsBalance = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [clicked, setClicked] = useState(false);

	// Filter the pointsGoodsData based on the search term
	const filteredGoods = pointsGoodsData.prices.filter((item) =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleClick = () => {
		setClicked(!clicked);
	};

	return (
		<div className="w-full">
			<div className="w-full pt-[4rem] text-xs px-2 flex items-center">
				<div className="flex items-center gap-2 py-1 bg-white px-2 rounded-full w-full">
					<IoSearchOutline size={20} />
					<input
						type="text"
						placeholder="Search for product information"
						className="border-none outline-none w-full"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<button
					className={`px-2 ${clicked ? "hidden" : "block"}`}
					onClick={handleClick}>
					<LuLayoutList size={20} />
				</button>
				<button
					className={`px-2 ${clicked ? "block" : "hidden"}`}
					onClick={handleClick}>
					<LuLayoutDashboard size={20} />
				</button>
			</div>
			{filteredGoods.length === 0 ? (
				<div className="flex justify-center items-center w-full pt-20">
					<div className="w-[15rem]">
						<Image
							src={noItem}
							width="0"
							height="0"
							sizes="100vw"
							quality={100}
							alt="noImage"
						/>
					</div>
				</div>
			) : (
				<PointsOrders
					filteredGoods={filteredGoods}
					clicked={clicked}
				/>
			)}
		</div>
	);
};

export default PointsBalance;
