import allGoodsData from "@/lib/sample-data";
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
	const [currentTime, setCurrentTime] = useState<Date>(new Date());
	const [calculatedCountdowns, setCalculatedCountdowns] = useState<{
		[key: string]: string;
	}>({});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000); // Update every second

		return () => clearInterval(interval); // Clean up interval on unmount
	}, []);

	useEffect(() => {
		const updatedCountdowns: { [key: string]: string } = {};
		orders?.forEach((order) => {
			if (order.opening_time) {
				const countdown = calculateCountdown(order.opening_time);
				updatedCountdowns[order.orderNo] = countdown;
			}
		});
		setCalculatedCountdowns(updatedCountdowns);
	}, [currentTime, orders]);

	const calculateCountdown = (targetTime: Date | null) => {
		if (!targetTime) return "00:00"; // Handle null case

		const targetDate = new Date(new Date(targetTime).getTime() + 120000);
		const now = currentTime;
		const diff = targetDate.getTime() - now.getTime();

		console.log(`Target Date: ${targetDate}`);
		console.log(`Now: ${now}`);
		console.log(`Diff: ${diff}`);

		if (diff <= 0) {
			return "00:00"; // Ensure countdown doesn't go negative
		}

		const minutes = Math.floor(diff / 60000);
		const seconds = Math.floor((diff % 60000) / 1000);

		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}`;
	};

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
								className="rounded-md w-14"
							/>
							<p>
								{order.index === 2 || order.index === 3
									? "VIP 71x returns"
									: "Cash 2x returns"}
							</p>
						</div>
						<div className="flex items-end text-gray-400 flex-col">
							<p>₱{allGoodsData.prices[order.index || 0].cost}.00</p>
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
					<div className="w-full flex justify-end px-4 py-3 gap-3">
						{order.my_choice !== null ? (
							<p className="flex justify-center items-center">
								Bonus countdown: {calculatedCountdowns[order.orderNo] || "N/A"}
							</p>
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
