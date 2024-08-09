import { pointsType } from "@/types";
import React from "react";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	cost: number;
	data: pointsType;
}

const PointsInsufficientModal: React.FC<ModalProps> = ({
	isVisible,
	onClose,
	cost,
	data,
}) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
			<div
				id="order-modal"
				className={`bg-white px-5 py-4 rounded shadow-lg text-xs transition-transform duration-300 transform ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<p>{data.title} added successfully</p>
				<div className="flex justify-evenly items-center pt-4">
					<button
						className="text-red-500"
						onClick={onClose}>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default PointsInsufficientModal;
