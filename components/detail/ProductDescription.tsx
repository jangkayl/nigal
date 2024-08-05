"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { RiHome3Line } from "react-icons/ri";
import { detailType } from "@/types";
import DetailsModal from "./DetailsModal";
import SelectDetail from "./SelectDetail";

interface Props {
	data: detailType;
	oneBet: boolean;
	dataIndex: number;
}

const ProductDescription = ({ data, oneBet, dataIndex }: Props) => {
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
			router.push(`/order/submit?${query}`);
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
				<p className="font-semibold text-red-500">
					{oneBet
						? "Participate guesses with a 1.25% chance of getting 80 times the cash back."
						: "After purchase, can participate in guess odd or even, 50% chance of getting 2 times the cash back."}
				</p>
			</div>
			<div className="p-2">
				<p className="font-semibold">Rules of the game:</p>
				<p>
					<span className="font-semibold">1.</span> Generate a number every 2
					minutes, 720 times a day;
				</p>
				<p>
					<span className="font-semibold">2.</span>{" "}
					{oneBet
						? "You can buy more than one number to increase your win rate, with a 10% win rate for 8 Numbers, a 12.5% win rate for 10 Numbers, and a 50% win rate for 40 Numbers.The winning rate for buying 70 Numbers is 87.5%"
						: "The result will only be odd or even, with a win rate of 50%"}
				</p>
				<p>
					<span className="font-semibold">3.</span> If you win, you can choose
					to return it for cash. Even if you lose, you can choose to exchange
					points or get the goods.
				</p>
			</div>
			<div className="p-2">
				<p>
					Use any of the following methods to see if you are a winner: <br /> •
					check the winning number in the Prize opening record in the Account.
				</p>
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
			<DetailsModal
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

export default ProductDescription;
