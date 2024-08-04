import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const SelectDetail = () => {
	return (
		<div className="flex justify-between items-center p-2 text-sm">
			<p>Please select: </p>
			<FaAngleRight />
		</div>
	);
};

export default SelectDetail;
