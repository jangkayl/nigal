import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import AllGoods from "./AllGoods";

const Hotspot = () => {
	return (
		<div className="w-full bg-white px-3 py-6 pb-52">
			<div className="flex justify-between">
				<p>HOTSPOT</p>
				<button className="flex items-center">
					All goods
					<MdKeyboardArrowRight size={30} />
				</button>
			</div>
			<AllGoods />
		</div>
	);
};

export default Hotspot;
