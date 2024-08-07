import { orderType } from "@/types";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	order: orderType | null;
}

const ReceivedModal: React.FC<ModalProps> = ({ isVisible, onClose, order }) => {
	if (!isVisible || !order) return null;

	const fee: any = (order.total * 0.02).toFixed(2);
	const cash = (order.total - fee).toFixed(1);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				id="order-modal"
				className={`bg-red-700 px-5 py-8 rounded shadow-lg text-sm transition-transform duration-300 transform text-white text-center  ${
					isVisible ? "animate-pop-up" : ""
				}`}>
				<FaStar
					size={70}
					className="p-3 bg-yellow-300 rounded-full text-yellow-600 absolute top-[-2rem] left-[50%] translate-x-[-50%] border-yellow-500 border-4"
				/>
				{order?.status === "Sales success" ? (
					<div>
						<p className="pt-5">Sales success</p>
						<p className="text-gray-400 pt-2">
							Fee {fee}, Awarded cash {cash}
						</p>
					</div>
				) : (
					<div>
						<p className="pt-5">Redeem success</p>
						<p className="text-gray-400 pt-2">
							Awarded {order.total.toFixed(2)} points
						</p>
					</div>
				)}
				<div className="flex justify-center items-center pt-3">
					<button
						className="text-red-400 py-2 px-10 bg-yellow-400 rounded-full"
						onClick={onClose}>
						Sure
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReceivedModal;
