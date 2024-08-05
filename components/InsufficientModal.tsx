import Link from "next/link";
import React from "react";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	cost: number;
}

const InsufficientModal: React.FC<ModalProps> = ({
	isVisible,
	onClose,
	cost,
}) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
			<div
				id="order-modal"
				className={`bg-white px-9 py-4 rounded shadow-lg text-xs transition-transform duration-300 transform ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<p>Payment failed. Insufficient balance: {cost}</p>
				<div className="flex justify-evenly items-center pt-4">
					<button
						className="text-red-500"
						onClick={onClose}>
						Cancel
					</button>
					<Link
						href={"/user"}
						className="text-sky-500">
						Top up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default InsufficientModal;
