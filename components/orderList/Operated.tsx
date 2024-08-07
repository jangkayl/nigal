import { formatDateTime } from "@/lib/utils";
import { orderType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegRegistered } from "react-icons/fa6";
import { useModalState } from "../ModalContext";
import ReceivedModal from "./ReceivedModal";
import {
	updateRedeemPoints,
	updateRefund,
} from "@/lib/actions/prizeAuto.action";

interface Props {
	orders?: orderType[];
	modal: boolean;
	setModal: any;
}

const Operated = ({ orders, modal, setModal }: Props) => {
	const router = useRouter();
	const [currentOrder, setCurrentOrder] = useState<orderType | null>(null);
	const { state } = useModalState();

	const handleHotspot = (order: string) => {
		router.push(`/order/game/${order}`);
	};

	// Sort orders: Descending by opening_time first, then by time if opening_time is null
	const sortedOrders = orders?.slice().sort((a, b) => {
		if (a.opening_time && b.opening_time) {
			// Both have opening_time, sort by opening_time
			return (
				new Date(b.opening_time).getTime() - new Date(a.opening_time).getTime()
			);
		}
		if (a.opening_time && !b.opening_time) {
			// a has opening_time, b does not
			return -1;
		}
		if (!a.opening_time && b.opening_time) {
			// b has opening_time, a does not
			return 1;
		}
		// Both have null opening_time, sort by time
		return new Date(b.time).getTime() - new Date(a.time).getTime();
	});

	const handleRefund = async (points: number, order: orderType) => {
		updateRefund(points, order.orderNo);
		setCurrentOrder(order);
		setModal(true);
	};

	const handleRedeemPoints = async (points: number, order: orderType) => {
		updateRedeemPoints(points, order.orderNo);
		setCurrentOrder(order);
		setModal(true);
	};

	const handleClose = () => {
		setModal(false);
		setCurrentOrder(null);
	};

	return (
		<div className="w-full pt-20 pb-32">
			{sortedOrders?.map((order) => (
				<div key={order.orderNo}>
					{order.isDone !== true && (
						<div
							className="bg-white my-2"
							key={order.orderNo}>
							<div className="flex justify-between items-center border-b py-2 px-4">
								<p>{formatDateTime(order.time)}</p>
								<p className="text-red-500">{order.status}</p>
							</div>
							<div className="flex justify-between py-3 px-4">
								<div className="flex gap-5">
									<Image
										src={order.image || ""}
										width={100}
										height={100}
										alt="order"
										quality={100}
										className="rounded-md w-16"
									/>
									<p>{order.returns}</p>
								</div>
								<div className="flex items-end text-gray-400 flex-col">
									<p>₱{order.cost}.00</p>
									<p>x{order.item}</p>
								</div>
							</div>
							<div className="w-full flex justify-end border-b px-4">
								<p className="pb-3">
									1 Item, Total amount
									<span className="text-red-500 font-semibold">
										{" "}
										₱{order.total}.00
									</span>
								</p>
							</div>
							<div className="w-full flex justify-end items-center px-4 py-3 gap-3">
								{order.my_choice !== null ? (
									<div>
										{order.status === "Waiting for draw" ? (
											<p className="">Bonus countdown: {state.countdown}</p>
										) : (
											<div>
												{order.status === "Sales success" ? (
													<button
														className="p-2 border rounded-lg border-cyan-500 text-cyan-500 flex justify-center items-center"
														onClick={() => handleRefund(order.total, order)}
														disabled={modal}>
														Refund
													</button>
												) : (
													<button
														className="p-2 border rounded-lg border-cyan-500 text-cyan-500 flex justify-center items-center"
														onClick={() =>
															handleRedeemPoints(order.total, order)
														}
														disabled={modal}>
														Redeem points
													</button>
												)}
											</div>
										)}
									</div>
								) : (
									<button
										className="border rounded-lg border-red-500 text-red-500 flex justify-center items-center p-2"
										onClick={() => handleHotspot(order.orderNo)}>
										HOT SPOT <FaRegRegistered size={10} />
									</button>
								)}
								<button
									className="p-2 border rounded-lg border-gray-400 text-gray-400"
									onClick={() => router.push(`/order/detail/${order.orderNo}`)}>
									View details
								</button>
							</div>
						</div>
					)}
				</div>
			))}
			<ReceivedModal
				isVisible={modal}
				onClose={handleClose}
				order={currentOrder} // Pass the current order to the modal
			/>
		</div>
	);
};

export default Operated;
