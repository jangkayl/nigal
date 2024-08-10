"use client";
import { getOrderById, updateUserVipOrder } from "@/lib/actions/prize.action";
import { orderType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSessionUser } from "@/lib/actions/user.action";
import { startCronJob } from "@/lib/actions/prizeAuto.action";
import BetError from "@/components/submit-order/BetError";
import BetSuccess from "@/components/submit-order/BetSuccess";
import BetNeedAll from "./BetNeedAll";

const VipBet = ({ params }: any) => {
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [bet, setBet] = useState(false);
	const [result, setResult] = useState<orderType>();
	const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
	const [remainingCount, setRemainingCount] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		const fetchOrders = async () => {
			const user = await getSessionUser();
			if (user?.user.id) {
				const res = await getOrderById(params);
				setResult(res);
				if (res?.vipChoices) {
					setSelectedNumbers(res.vipChoices);
				}
				if (res?.total) {
					if (res.cost === 1) {
						setRemainingCount(res.total - (res.vipChoices?.length || 0));
					} else {
						setRemainingCount(res.total / 5 - (res.vipChoices?.length || 0));
					}
				}
			}
		};

		fetchOrders();
	}, [params]);

	const handleNumberClick = (number: number) => {
		if (selectedNumbers.includes(number)) {
			const updatedNumbers = selectedNumbers.filter((num) => num !== number);
			setSelectedNumbers(updatedNumbers);
			// Update remaining count
			if (result?.cost === 1) {
				setRemainingCount(
					result?.total ? result.total - updatedNumbers.length : 0
				);
			} else {
				setRemainingCount(
					result?.total ? result.total / 5 - updatedNumbers.length : 0
				);
			}
		} else if (remainingCount > 0) {
			const updatedNumbers = [...selectedNumbers, number];
			setSelectedNumbers(updatedNumbers);
			// Update remaining count
			if (result?.cost === 1) {
				setRemainingCount(
					result?.total ? result.total - updatedNumbers.length : 0
				);
			} else {
				setRemainingCount(
					result?.total ? result.total / 5 - updatedNumbers.length : 0
				);
			}
		}
	};

	const handleClick = async () => {
		const status = "Waiting for draw";

		if (
			!result?.opening_time &&
			result?.games === "Guess 71x return" &&
			remainingCount === 0
		) {
			setSuccess(true);
			await updateUserVipOrder(result?.orderNo, status, selectedNumbers);
			startCronJob();
		} else {
			setBet(true);
		}
	};

	const handleClose = () => {
		if (bet) {
			setBet(false);
		} else {
			setSuccess(false);
			setError(false);
			router.push(`/order/detail/${result?.orderNo}`);
		}
	};

	const renderNumberGrid = () => {
		const buttons = [];
		for (let i = 1; i <= 80; i++) {
			buttons.push(
				<button
					key={i}
					className={`w-[2.2rem] py-1 rounded-full border-2 border-yellow-600 text-white flex justify-center items-center ${
						selectedNumbers.includes(i) ? "bg-yellow-700" : "bg-yellow-500"
					}`}
					onClick={() => handleNumberClick(i)}>
					<p>{i}</p>
				</button>
			);
		}
		const rows = [];
		for (let i = 0; i < 10; i++) {
			rows.push(
				<div
					key={i}
					className="flex gap-2 justify-between items-center w-full">
					{buttons.slice(i * 8, i * 8 + 8)}
				</div>
			);
		}
		return rows;
	};

	return (
		<div className="w-full bg-[url('/background.svg')]">
			<div className="py-4 text-center relative bg-[#4cadb5]">
				<p className="text-white">VIP 71x RETURN</p>
			</div>
			<div className="flex items-center flex-col justify-center h-[40rem] gap-6">
				<div className="text-center">
					<p>Select your anticipated result</p>
					<p className="text-xs pt-2">Remaining selections: {remainingCount}</p>
				</div>
				<div className="flex flex-col gap-2">{renderNumberGrid()}</div>
				<button
					className="py-2 px-2 rounded-md text-white bg-yellow-500 border border-yellow-600 scale-animation"
					onClick={handleClick}>
					Confirm selection
				</button>
			</div>
			<BetNeedAll
				isVisible={bet}
				onClose={handleClose}
			/>
			<BetError
				isVisible={error}
				onClose={handleClose}
			/>
			<BetSuccess
				isVisible={success}
				onClose={handleClose}
			/>
		</div>
	);
};

export default VipBet;
