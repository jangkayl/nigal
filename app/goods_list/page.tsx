import React from "react";
import { Metadata } from "next";
import ListGoods from "@/components/goods_list/ListGoods";

export const metadata: Metadata = {
	title: `List of goods`,
};

const GoodsList = () => {
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto bg-gray-100 relative w-full">
			<ListGoods />
		</main>
	);
};

export default GoodsList;
