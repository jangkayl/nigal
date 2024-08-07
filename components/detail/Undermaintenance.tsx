import React from "react";
import undermaintenance from "@/public/undermaintenance.png";
import Image from "next/image";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const Undermaintenance: React.FC<ModalProps> = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				id="order-modal"
				className={`bg-red-500 px-5 py-8 rounded shadow-lg text-sm transition-transform duration-300 transform text-white flex justify-center items-center flex-col text-center  ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<div className="w-20 h-auto">
					<Image
						src={undermaintenance}
						alt="undermaintenance"
						width="0"
						height="0"
						className="w-20 h-auto"
						placeholder="blur"
					/>
				</div>
				UNDER MAINTENANCE
				<div className="flex justify-center items-center pt-3">
					<button
						className="text-red-400 py-2 px-4 bg-yellow-400 rounded-full"
						onClick={onClose}>
						Okay nigs
					</button>
				</div>
			</div>
		</div>
	);
};

export default Undermaintenance;
