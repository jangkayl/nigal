"use client";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import AllGoods from "./AllGoods";
import PromotionType from "./PromotionType";
import Partners from "./Partners";
import { useRouter } from "next/navigation";

const Hotspot = () => {
	const router = useRouter();
	return (
		<div className="w-full bg-white px-3 py-6 pb-20">
			<div className="flex justify-between">
				<p>HOTSPOT</p>
				<button
					onClick={() => router.push("/goods_list")}
					className="flex items-center">
					All goods
					<MdKeyboardArrowRight size={30} />
				</button>
			</div>
			<AllGoods />
			<PromotionType />
			<Partners />
		</div>
	);
};

export default Hotspot;
