import React from "react";
import { Metadata } from "next";
import GoodsNav from "@/components/hot_goods/GoodsNav";
import GoodsDashboard from "@/components/hot_goods/GoodsDashboard";
import GoodsVip from "@/components/hot_goods/GoodsVip";

export const metadata: Metadata = {
	title: `Popular items`,
};

const HotGoods = ({ params }: any) => {
	console.log(params);
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative">
			<GoodsNav />
			{params.params === "1" && <GoodsDashboard />}
			{params.params === "2" && <GoodsVip />}
		</main>
	);
};

export default HotGoods;
