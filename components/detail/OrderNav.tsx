"use client";
import { getOrderById, updateUserOrder } from "@/lib/actions/prize.action";
import { orderType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BetError from "../submit-order/BetError";
import BetSuccess from "../submit-order/BetSuccess";
import { getSessionUser } from "@/lib/actions/user.action";
import { startCronJob } from "@/lib/actions/prizeAuto.action";

const OrderNav = ({ params }: any) => {
	const [selected, setSelected] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [result, setResult] = useState<orderType>();
	const router = useRouter();

	useEffect(() => {
		const fetchOrders = async () => {
			const user = await getSessionUser();
			if (user?.user.id) {
				const res = await getOrderById(params);
				setResult(res);
			}
		};

		fetchOrders();
	}, [params]);

	const handleButtonClick = (choice: string) => {
		setSelected(choice);
	};

	const handleClick = async () => {
		const status = "Waiting for draw";
		const choice = selected === "even" ? 0 : 1;

		if (!result?.opening_time) {
			setSuccess(true);
			await updateUserOrder(result?.orderNo, status, choice);
			startCronJob();
		} else {
			setError(true);
		}
	};

	const handleClose = () => {
		setSuccess(false);
		setError(false);
		router.push(`/order/detail/${result?.orderNo}`);
	};

	return (
		<div className="w-full bg-[url('/background.svg')]">
			<div className="py-4 text-center relative bg-[#4cadb5]">
				<p className="text-white">ODD OR EVEN</p>
			</div>
			<div className="flex items-center flex-col justify-center h-[27rem] gap-9">
				<p>Select your anticipated result</p>
				<div className="flex justify-evenly w-full text-white text-xl pt-4">
					<button
						className={`py-10 px-3 border border-yellow-600 ${
							selected === "odd" ? "bg-yellow-700" : "bg-yellow-500"
						}`}
						onClick={() => handleButtonClick("odd")}>
						Odd <br />
						number
					</button>
					<button
						className={`py-10 px-3 border border-yellow-600 ${
							selected === "even" ? "bg-yellow-700" : "bg-yellow-500"
						}`}
						onClick={() => handleButtonClick("even")}>
						Even <br />
						number
					</button>
				</div>
				<button
					className="py-2 px-2 rounded-md text-white bg-yellow-500 border border-yellow-600 scale-animation"
					onClick={handleClick}>
					Confirm selection
				</button>
			</div>
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

export default OrderNav;
