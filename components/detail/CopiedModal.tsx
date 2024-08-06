import Link from "next/link";
import React from "react";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const CopiedModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				id="order-modal"
				className={`bg-[rgba(0,0,0,0.5)] px-5 py-4 rounded shadow-lg text-xs transition-transform duration-300 transform text-white ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<p className="pb-3">Copied successfully</p>
				<div className="flex justify-evenly items-center pt-3 border-t ">
					<button
						className="text-blue-400"
						onClick={onClose}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default CopiedModal;
