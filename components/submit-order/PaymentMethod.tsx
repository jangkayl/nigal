import { userType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiCurrencyYen } from "react-icons/hi2";
import InsufficientModal from "../InsufficientModal";

interface UserProps {
	user: userType | null;
	cost: number;
}

const PaymentMethod = ({ user, cost }: UserProps) => {
	const formattedBalance = user?.balance?.toFixed(2) || "0.00";
	const costBalance = cost.toFixed(2) || "0.00";
	const [insufficient, setInsufficient] = useState(false);
	const router = useRouter();

	const hasSufficientBalance = () => {
		const balance = user?.balance || 0;
		return balance >= cost;
	};

	const isSufficient = hasSufficientBalance();

	const handleSubmit = () => {
		if (isSufficient) {
			router.push("/order/status");
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
				<div className="flex items-center border border-red-400 py-2 px-5 justify-center mt-2">
					<div className="flex items-center border-r-2 pr-5 gap-1">
						<HiCurrencyYen
							size={25}
							className="text-orange-400"
						/>
						<p className="text-red-500">Pay via balance</p>
					</div>
					<p className="pl-3 text-gray-400">
						Balance available: {formattedBalance}
					</p>
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
