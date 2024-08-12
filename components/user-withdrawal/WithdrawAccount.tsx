"use client";
import React, { useState } from "react";
import WithdrawAmount from "./WithdrawAmount";
import { userType } from "@/types";

interface Props {
	user: userType | null;
}

const WithdrawAccount = ({ user }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [provider, setProvider] = useState("Select withdrawal account");
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="pt-[5.5rem]">
			<p className="px-6 py-3">Withdraw Account</p>
			<div className="mx-3 py-3 px-4 bg-white text-xs	">
				<div
					className="pb-3 border-b cursor-pointer flex items-center justify-between"
					onClick={toggleDropdown}>
					<p>Service provider</p>
					<div className="w-[11rem]">
						<p
							className={`relative text-start ${
								provider === "Gcash" ? "text-black" : "text-gray-400"
							}`}>
							{provider}{" "}
							{isDropdownOpen && (
								<div className="pt-3 absolute left-[-10%] top-3 w-[12rem]">
									<ul className="bg-gray-100 rounded-md shadow-lg text-black">
										<li
											className="px-2 py-2 cursor-pointer hover:bg-gray-200"
											onClick={() => setProvider("Select withdrawal account")}>
											Select withdrawal account
										</li>
										<li
											className="px-2 py-2 cursor-pointer hover:bg-gray-200"
											onClick={() => setProvider("Gcash")}>
											Gcash
										</li>
									</ul>
								</div>
							)}
						</p>
					</div>
				</div>
				<div className="pt-3 pb-2 flex items-center justify-between">
					<p>Account</p>
					{provider === "Gcash" ? (
						<div>
							<input
								type="number"
								className="outline-none w-[11rem]"
								placeholder="09*********"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
							/>
						</div>
					) : (
						<p className="text-gray-400 w-[11rem]">Select service provider</p>
					)}
				</div>
				{provider === "Gcash" && (
					<div className="flex justify-end">
						<input
							type="text"
							className="outline-none w-[11rem] py-2 border-t"
							placeholder="Enter account name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				)}
			</div>
			<WithdrawAmount
				user={user}
				provider={provider}
				number={number}
				name={name}
			/>
		</div>
	);
};

export default WithdrawAccount;
