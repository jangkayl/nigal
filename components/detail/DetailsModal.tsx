import { detailType } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Quantity from "./Quantity";
import PredictType from "./PredictType";

interface DetailsModalProps {
	show: boolean;
	onClose: () => void;
	data: detailType;
	checkoutButtonRef: React.RefObject<HTMLButtonElement>;
	oneBet: boolean;
	setWinrate: React.Dispatch<React.SetStateAction<number>>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	setCost: React.Dispatch<React.SetStateAction<number>>;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
	show,
	onClose,
	data,
	checkoutButtonRef,
	oneBet,
	setWinrate,
	setCount,
	setCost,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [winrate, localSetWinrate] = useState(1.25);
	const [activePredictType, setActivePredictType] = useState<string | null>(
		null
	);
	const [count, localSetCount] = useState(1);
	const [cost, localSetCost] = useState(data.cost);

	const handleAdd = () => {
		localSetCost(cost + data.cost);
		localSetCount(count + 1);
		if (oneBet) {
			localSetWinrate(winrate + 1.25);
		}
	};

	const handleMinus = () => {
		localSetCost(cost - data.cost);
		localSetCount(count - 1);
		if (oneBet) {
			localSetWinrate(winrate - 1.25);
		}
	};

	useEffect(() => {
		setWinrate(winrate);
		setCount(count);
		setCost(cost);
	}, [winrate, count, cost, setWinrate, setCount, setCost]);

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

	const handlePredictTypeSelect = (type: string) => {
		console.log(`Selected Predict Type: ${type}`);
		setActivePredictType(type);
		if (type === "Big" || type === "Small") {
			localSetWinrate(50);
			localSetCost(40);
			localSetCount(40);
		} else if (type === "Mantissa") {
			localSetWinrate(10);
			localSetCost(8);
			localSetCount(8);
		} else if (type === "Area") {
			localSetWinrate(12.5);
			localSetCost(10);
			localSetCount(10);
		}
	};

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
							className="rounded-md"
						/>
						<div className="flex flex-col gap-4 justify-center pl-4 ">
							<p className="text-base">{data.title}</p>
							<div className="flex gap-3 text-xs items-center">
								<p className="text-[.6rem] text-red-600">
									₱<span className="text-sm">{data.cost}.00</span>
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
				<Quantity
					winrate={winrate}
					oneBet={oneBet}
					count={count}
					cost={cost}
					handleAdd={handleAdd}
					handleMinus={handleMinus}
				/>
				{oneBet && (
					<PredictType
						onSelectPredictType={handlePredictTypeSelect}
						activeButton={activePredictType}
					/>
				)}
			</div>
		</div>
	);
};

export default DetailsModal;
