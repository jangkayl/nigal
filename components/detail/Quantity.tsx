"use client";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface Props {
	oneBet: boolean;
	winrate: number;
	count: number;
	cost: number;
	handleAdd: () => void;
	handleMinus: () => void;
}

const Quantity = ({
	oneBet,
	winrate,
	count,
	cost,
	handleAdd,
	handleMinus,
}: Props) => {
	return (
		<div className="pt-8 flex items-end justify-between">
			<div>
				<p className="text-gray-400 pb-2">Quantity</p>
				<div className="flex items-center">
					<button
						onClick={handleMinus}
						disabled={count === 1}>
						<FaMinus
							size={30}
							className={`${
								count === 1
									? "border-gray-300 text-gray-300"
									: "border-gray-500 text-gray-500"
							} py-2 w-12 border rounded-l-md border-r-0`}
						/>
					</button>
					<p className="border-gray-500 border py-1 text-gray-500 w-12 text-center text-sm">
						{count}
					</p>
					<button onClick={handleAdd}>
						<FaPlus
							size={30}
							className="py-2 w-12 border-gray-500 border text-gray-500 rounded-r-md border-l-0"
						/>
					</button>
				</div>
			</div>
			<div className="text-xs text-end text-red-600">
				<p>Total price: ₱{cost}.00</p>
				<p>Win rate: {oneBet ? winrate.toFixed(2) : "50.00"}%</p>
			</div>
		</div>
	);
};

export default Quantity;
