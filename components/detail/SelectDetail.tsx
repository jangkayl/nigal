import React from "react";
import { FaAngleRight } from "react-icons/fa6";

interface SelectDetailProps {
	onClick: () => void;
}

const SelectDetail: React.FC<SelectDetailProps> = ({ onClick }) => {
	return (
		<button
			className="flex justify-between items-center px-4 py-3 text-sm bg-white w-full my-4"
			onClick={onClick}>
			<p>Please select: </p>
			<FaAngleRight />
		</button>
	);
};

export default SelectDetail;
