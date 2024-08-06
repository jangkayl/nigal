import { updateSuccessOrder } from "@/lib/actions/prize.action";
import { formatDateTime } from "@/lib/utils";
import { orderType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegRegistered } from "react-icons/fa6";

interface Props {
	orders?: orderType[];
}

const Operated = ({ orders }: Props) => {
	const router = useRouter();
	const [countdown, setCountdown] = useState<string>("");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const nextMinute = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours(),
				now.getMinutes() + 1,
				0,
				0
			);

			const diff = Math.max((nextMinute.getTime() - now.getTime()) / 1000, 0);

			const minutes = Math.floor(diff / 60);
			const seconds = Math.floor(diff % 60);

			const formattedMinutes = String(minutes).padStart(2, "0");
			const formattedSeconds = String(seconds).padStart(2, "0");

			setCountdown(`${formattedMinutes}:${formattedSeconds}`);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const updateOrderStatus = async (order: orderType) => {
		const image =
			"https://manage.im2015.com//uploads/attach/2020/05/20200515/0e8c80facdfc560b7e45e3281b20c13c.png";
		const returns = "Win the lottery";
		const status = "Sales success";
		const total = order.total * 2;
		await updateSuccessOrder(order.orderNo, image, returns, status, total);
		window.location.reload();
	};

	useEffect(() => {
		if (countdown === "00:00") {
			orders?.forEach((order) => {
				if (
					order.opening_time &&
					order.status !== "Sales success" &&
					order.status !== "Sales failed"
				) {
					updateOrderStatus(order);
				}
			});
		}
	}, [countdown, orders]);

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

	return (
		<div className="w-full pt-20 pb-32">
			{sortedOrders?.map((order) => (
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
									<p className="">Bonus countdown: {countdown}</p>
								) : (
									<button
										className="p-2 border rounded-lg border-cyan-500 text-cyan-500 flex justify-center items-center"
										onClick={() => console.log("Success button clicked")}>
										Refund
									</button>
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
			))}
		</div>
	);
};

export default Operated;
