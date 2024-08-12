import { userType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
	user: userType | null;
	provider: string;
	number: string;
	name: string;
}

const WithdrawAmount = ({ user, provider, number, name }: Props) => {
	const [selected, setSelected] = useState(0);
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			if (provider !== "Gcash") {
				setError("Select a provider");
			} else if (!number || !name) {
				setError("Enter name and number");
			} else if (selected === 0) {
				setError("Please select an amount");
			} else if (user.balance < 1 || user.balance < selected) {
				setError("Insufficient balance");
			} else {
				setError("");
			}
		} else {
			setError("");
			router.push("/sign-in");
		}
	}, [user, selected, provider, router, number, name]);

	useEffect(() => {
		setShowError(false);
	}, [selected, provider, user, name, number]);

	const handleSelection = (amount: number) => {
		setSelected(amount);
	};

	const handleWithdraw = () => {
		if (user) {
			if (!error && user?.balance >= selected) {
				setShowError(false);
				router.push("/user/withdrawal/success");
			} else {
				setShowError(true);
			}
		}
	};

	return (
		<div className="p-3">
			<div className="px-3 py-4 bg-white rounded-sm">
				<p>Withdraw amount</p>
				<div className="flex flex-col justify-center items-center">
					<div className="grid grid-cols-3 text-center text-base py-3 w-[17rem] gap-3">
						{[500, 1000, 2000, 5000, 10000, 20000].map((amount) => (
							<div key={amount}>
								<button
									className={`border rounded-sm w-[5rem] h-[2.5rem] ${
										selected === amount
											? "border-cyan-400 text-cyan-400"
											: "border-gray-400 text-black"
									}`}
									onClick={() => handleSelection(amount)}>
									₱{amount}
								</button>
							</div>
						))}
					</div>
				</div>
				<p className="text-xs pt-1">Balance: ₱{user?.balance.toFixed(2)}</p>
			</div>
			<div className="text-xs pt-1 text-gray-400 px-3 flex flex-col gap-1">
				<p>Processsing fee: ₱{selected * 0.1}</p>
				<p>Actual amount: ₱{selected * 0.9}</p>
			</div>
			<div className="mt-12">
				<p className="pb-2 text-center text-red-500">
					{showError ? error : ""}
				</p>
				<button
					className="w-full bg-cyan-400 text-white py-3 rounded-md"
					onClick={handleWithdraw}>
					Withdraw
				</button>
			</div>
		</div>
	);
};

export default WithdrawAmount;
