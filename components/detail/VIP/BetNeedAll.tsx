import React from "react";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const BetNeedAll: React.FC<ModalProps> = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
			<div
				id="order-modal"
				className={`bg-white px-9 py-4 rounded shadow-lg text-xs transition-transform duration-300 transform ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<p className="pb-3">Need to bet all remaining selections</p>
				<div className="flex justify-evenly items-center pt-3 border-t ">
					<button
						className="text-blue-500"
						onClick={onClose}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default BetNeedAll;
