"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { RiHome3Line } from "react-icons/ri";
import { detailType } from "@/types";
import SelectDetail from "../detail/SelectDetail";
import PointsModal from "./PointsModal";

interface Props {
	data: detailType;
	oneBet: boolean;
	dataIndex: number;
}

const PointsDescription = ({ data, oneBet, dataIndex }: Props) => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [winrate, setWinrate] = useState(1.25);
	const [count, setCount] = useState(1);
	const [cost, setCost] = useState(data.cost);
	const checkoutButtonRef = useRef<HTMLButtonElement>(null);

	const handleCheckoutClick = () => {
		if (showModal) {
			const query = new URLSearchParams({
				winrate: winrate.toString(),
				count: count.toString(),
				cost: cost.toString(),
				dataIndex: dataIndex.toString(),
			}).toString();
			router.push(`/points/submit?${query}`);
		} else {
			setShowModal(true);
		}
	};

	return (
		<div className="text-[0.8rem] pb-20">
			<SelectDetail onClick={() => setShowModal(true)} />
			<div className="py-3 bg-white">
				<p className="text-center text-sm">Product Description</p>
			</div>
			<div className="p-2">
				<p>Add INTERESTING MALL balance after exchange.</p>
			</div>
			<div className="fixed bottom-0 flex justify-between items-center w-full max-w-sm px-5 py-2 bg-white z-10 border-t-2">
				<button
					className="flex flex-col justify-center items-center text-xs text-gray-500"
					onClick={() => router.back()}>
					<RiHome3Line size={20} />
					<p>Home</p>
				</button>
				<button
					ref={checkoutButtonRef}
					className="text-center w-64 rounded-3xl py-2 bg-yellow-500 text-white"
					onClick={handleCheckoutClick}>
					Checkout
				</button>
			</div>
			<PointsModal
				show={showModal}
				onClose={() => setShowModal(false)}
				data={data}
				checkoutButtonRef={checkoutButtonRef}
				oneBet={oneBet}
				setWinrate={setWinrate}
				setCount={setCount}
				setCost={setCost}
			/>
		</div>
	);
};

export default PointsDescription;
