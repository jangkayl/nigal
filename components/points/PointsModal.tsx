import { detailType } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface PointsModalProps {
	show: boolean;
	onClose: () => void;
	data: detailType;
	checkoutButtonRef: React.RefObject<HTMLButtonElement>;
	oneBet: boolean;
	setWinrate: React.Dispatch<React.SetStateAction<number>>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	setCost: React.Dispatch<React.SetStateAction<number>>;
}

const PointsModal: React.FC<PointsModalProps> = ({
	show,
	onClose,
	data,
	checkoutButtonRef,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				checkoutButtonRef.current &&
				!checkoutButtonRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (show) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [show, onClose, checkoutButtonRef]);

	return (
		<div
			className={`fixed inset-0 flex justify-center items-end bg-black bg-opacity-50 transition-opacity duration-300 ${
				show
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				ref={modalRef}
				className={`bg-white rounded-lg w-full h-auto max-w-sm p-4 transform transition-transform duration-300 pb-20 ${
					show ? "translate-y-0" : "translate-y-full"
				}`}>
				<div className="flex justify-between items-start">
					<div className="flex">
						<Image
							src={data.image}
							alt="image"
							width={80}
							height={80}
							quality={100}
							className="rounded-md"
						/>
						<div className="flex flex-col gap-4 justify-center pl-4 ">
							<p className="text-base">{data.title}</p>
							<div className="flex gap-3 text-xs items-center">
								<p className="text-xs text-red-600">
									Points <span className="text-base">{data.cost}</span>
								</p>
								<p className="text-gray-500">Inventory: 696969</p>
							</div>
						</div>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 fixed top-3 right-3">
						<IoClose size={25} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PointsModal;
