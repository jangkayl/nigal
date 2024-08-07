"use client";
import allGoodsData from "@/lib/sample-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Undermaintenance from "./detail/Undermaintenance";
import { orderType } from "@/types";

const AllGoods = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<orderType | null>(null);
	const router = useRouter();

	const handleClick = (index: number) => {
		if (index === 2 || index === 3) {
			setIsModalVisible(true);
		} else {
			router.push(`/detail/${index + 1}`);
		}
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	};

	return (
		<div className="py-3 flex justify-center">
			<div className="grid grid-cols-2 gap-3">
				<Undermaintenance
					isVisible={isModalVisible}
					onClose={handleCloseModal}
				/>

				{allGoodsData.prices.map((item, index) => (
					<button
						key={index}
						className="border shadow-md rounded-md"
						onClick={() => handleClick(index)}>
						<div className="h-auto w-full">
							<Image
								src={item.image}
								alt="promo"
								width="0"
								height="0"
								sizes="100vw"
								placeholder="blur"
								className="w-full"
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
