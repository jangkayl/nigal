import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import AllGoods from "./AllGoods";
import PromotionType from "./PromotionType";
import Partners from "./Partners";

const Hotspot = () => {
	return (
		<div className="w-full bg-white px-3 py-6 pb-20">
			<div className="flex justify-between">
				<p>HOTSPOT</p>
				<button className="flex items-center">
					All goods
					<MdKeyboardArrowRight size={30} />
				</button>
			</div>
			<AllGoods />
			<PromotionType />
			<Partners />
		</div>
	);
};

export default Hotspot;
