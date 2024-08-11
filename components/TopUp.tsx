import Link from "next/link";
import React from "react";
import { CiWallet } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";

const TopUp = () => {
	return (
		<div className="grid grid-cols-2 gap-3 text-center text-white w-full h-28 px-5 text-sm">
			<button className="flex bg-sky-300 justify-center items-center rounded-md flex-col gap-2">
				<CiWallet size={30} />
				<p>Top-up</p>
			</button>
			<Link
				className="flex bg-yellow-500 justify-center items-center w-full rounded-md flex-col gap-2"
				href={"/user/withdrawal"}>
				<LiaPiggyBankSolid size={30} />
				<p>Cash withdrawal</p>
			</Link>
		</div>
	);
};

export default TopUp;
