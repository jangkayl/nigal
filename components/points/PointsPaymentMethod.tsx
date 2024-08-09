import { pointsType, userType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiCurrencyYen } from "react-icons/hi2";
import { deductUserPoints } from "@/lib/actions/prize.action";
import PointsInsufficientModal from "./PointsInsufficientModal";
import PointsSuccessModal from "./PointsSuccessModal";

interface UserProps {
	user: userType | null;
	cost: number;
	data: pointsType;
}

const PointsPaymentMethod = ({ user, cost, data }: UserProps) => {
	const [insufficient, setInsufficient] = useState(false);
	const [success, setSuccess] = useState(false); // New state for success modal
	const router = useRouter();

	const hasSufficientPoints = () => {
		const points = user?.points || 0;
		return points >= cost;
	};

	const isSufficient = hasSufficientPoints();

	const handleSubmit = async () => {
		if (!user) {
			router.push("/sign-in");
			return;
		}

		if (isSufficient) {
			try {
				if (user) {
					const deductPoints = user.points - cost;
					const addBalance = user.balance + data.addBalance;
					await deductUserPoints(user.id, deductPoints, addBalance);
					setSuccess(true);
				}
			} catch (error) {
				console.error("Error processing payment:", error);
			}
		} else {
			setInsufficient(true);
		}
	};

	const handleCloseModal = () => {
		if (success) {
			setInsufficient(false);
			setSuccess(false);
			router.push("/user");
		} else {
			router.back();
		}
	};

	return (
		<div className="text-xs">
			<div className="bg-white p-3 mb-3">
				<p className="text-sm">Phone</p>
				<div className="px-3 bg-gray-100 py-2 mt-2 text-sm">
					<p>63{user?.phone}</p>
				</div>
			</div>
			<div className="bg-white p-3">
				<p className="text-sm">Payment Method</p>
				<div className="flex items-center border border-red-400 py-2 mt-2 justify-evenly">
					<div className="flex items-center gap-1">
						<HiCurrencyYen
							size={25}
							className="text-orange-400"
						/>
						<p className="text-red-500">Pay with points</p>
					</div>
					<p className="text-gray-400">Available Points: {user?.points}</p>
				</div>
			</div>
			<div className="text-sm fixed bottom-0 max-w-sm bg-white w-full px-3 py-2 justify-between flex items-center ">
				<p>
					Total: <span className="text-red-500">{cost} Points</span>
				</p>
				<button
					className="px-6 py-2 rounded-full bg-red-500 text-white"
					onClick={handleSubmit}>
					Check Out
				</button>
			</div>
			{insufficient && (
				<PointsInsufficientModal
					isVisible={insufficient}
					onClose={handleCloseModal}
					user={user}
				/>
			)}
			{success && (
				<PointsSuccessModal
					isVisible={success}
					onClose={handleCloseModal}
					cost={cost}
					data={data}
				/>
			)}
		</div>
	);
};

export default PointsPaymentMethod;
