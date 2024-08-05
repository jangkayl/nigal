import React, { useState } from "react";
import Chart from "./Chart";
import BelowChart from "./BelowChart";
import BullsEye from "./BullsEye";

const PrizeChart = ({ open, prizes }: any) => {
	const [bullsEye, setBullsEye] = useState(false);
	return (
		<div className={`${open ? "block" : "hidden"}`}>
			<div className="flex justify-evenly font-medium text-center text-xl">
				<button
					className={`${
						bullsEye ? "bg-zinc-700 text-gray-400" : "bg-orange-500  text-white"
					} w-full py-4`}
					onClick={() => setBullsEye(false)}>
					ODD OR EVEN
				</button>
				<button
					className={`${
						bullsEye ? "bg-orange-500  text-white" : "bg-zinc-700 text-gray-400"
					} w-full py-4`}
					onClick={() => setBullsEye(true)}>
					BULLS-EYE
				</button>
			</div>
			<div className={`${bullsEye ? "hidden" : "block"}`}>
				<div className="text-center py-2 w-full bg-[#e1e4e5]">
					<p>Trend of recent 50 periods</p>
				</div>
				<div>
					<Chart prizes={prizes} />
					<BelowChart prizes={prizes} />
				</div>
			</div>
			<div className={`${bullsEye ? "block" : "hidden"}`}>
				<BullsEye prizes={prizes} />
			</div>
		</div>
	);
};

export default PrizeChart;
