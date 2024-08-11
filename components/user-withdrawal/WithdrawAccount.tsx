"use client";
import React, { useState } from "react";

const WithdrawAccount = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
					<p className="relative text-gray-400">
						Please select withdrawal account{" "}
						{isDropdownOpen && (
							<div className="pt-3 absolute left-[-10%] top-3 w-[15rem]">
								<ul className="bg-gray-100 rounded-md shadow-lg text-black">
									<li className="px-2 py-2 cursor-pointer hover:bg-gray-200">
										Please select withdrawal account
									</li>
									<li className="px-2 py-2 cursor-pointer hover:bg-gray-200">
										Gcash
									</li>
								</ul>
							</div>
						)}
					</p>
				</div>
				<div className="pt-3 flex items-center justify-between">
					<p>Account</p>
					<p className="text-gray-400">Please select withdrawal account</p>
				</div>
			</div>
		</div>
	);
};

export default WithdrawAccount;
