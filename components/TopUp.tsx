import React from "react";
import { CiWallet } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";

const TopUp = () => {
	return (
		<div className="grid grid-cols-2 gap-3 text-center text-white w-full h-28 px-5 text-xs">
			<button className="flex bg-sky-300 justify-center items-center rounded-md flex-col">
				<CiWallet size={30} />
				<p>Top-up</p>
			</button>
			<button className="flex bg-yellow-500 justify-center items-center w-full rounded-md flex-col">
				<LiaPiggyBankSolid size={30} />
				<p>Cash withdrawal</p>
			</button>
		</div>
	);
};

export default TopUp;
