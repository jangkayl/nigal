import { detailType, userType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiCurrencyYen } from "react-icons/hi2";
import InsufficientModal from "../InsufficientModal";
import {
	deductUserBalance,
	generateOrder,
	getOrderById,
} from "@/lib/actions/prize.action";

interface UserProps {
	user: userType | null;
	cost: number;
	count: number;
	dataIndex: number;
	data: detailType;
}

const PaymentMethod = ({ user, cost, count, dataIndex, data }: UserProps) => {
	const formattedBalance = user?.balance?.toFixed(2) || "0.00";
	const costBalance = cost.toFixed(2) || "0.00";
	const [insufficient, setInsufficient] = useState(false);
	const router = useRouter();

	const hasSufficientBalance = () => {
		const balance = user?.balance || 0;
		return balance >= cost;
	};

	const isSufficient = hasSufficientBalance();

	const games =
		dataIndex === 2 || dataIndex === 3
			? "Guess 71x return"
			: "Guess Odd or Even";

	const handleSubmit = async () => {
		if (isSufficient) {
			if (user) {
				const deductBalance = user?.balance - cost;
				await deductUserBalance(user?.id, deductBalance);
			}
			await generateOrder(user?.id, count, games, cost, data.image.src);
			const success = await getOrderById(user?.id);
			router.push(`/order/status/${success?.orderNo}`);
		} else {
			setInsufficient(true);
		}
	};

	const handleCloseModal = () => {
		setInsufficient(false);
		router.back();
	};

	return (
		<div className="text-xs">
			<div className="bg-white p-3">
				<p className="text-sm">Payment Method</p>
				<div className="flex items-center border border-red-400 py-2 mt-2  justify-evenly">
					<div className="flex items-center gap-1">
						<HiCurrencyYen
							size={25}
							className="text-orange-400"
						/>
						<p className="text-red-500">Pay via balance</p>
					</div>
					<p className="text-gray-400">Balance available: {formattedBalance}</p>
				</div>
			</div>
			<div className="flex justify-between bg-white p-3 mt-3">
				<p className="text-sm">Total Price: </p>
				<p className="text-gray-400">₱{costBalance}</p>
			</div>
			<div className="text-sm fixed bottom-0 max-w-sm bg-white w-full px-3 py-2 justify-between flex items-center ">
				<p>
					Total: <span className="text-red-500">₱{cost}</span>
				</p>
				<button
					className="px-6 py-2 rounded-full bg-red-500 text-white"
					onClick={handleSubmit}>
					Check Out
				</button>
			</div>
			<InsufficientModal
				isVisible={insufficient}
				onClose={handleCloseModal}
				cost={cost}
			/>
		</div>
	);
};

export default PaymentMethod;
