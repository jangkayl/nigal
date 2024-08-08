import { formatDateTime } from "@/lib/utils";
import { orderType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
	orders?: orderType[];
}

const Converted = ({ orders }: Props) => {
	const router = useRouter();

	if (!orders || orders.length === 0) {
		return (
			<div className="pt-44 z-10 w-48 mx-auto max-w-sm">
				<Image
					src="https://www.im2015.com/h5/img/noOrder.3770f435.png"
					width={999}
					height={999}
					quality={100}
					alt="No Orders"
				/>
			</div>
		);
	}

	return (
		<div className="w-full pt-20 pb-32">
			{orders?.map((order) => (
				<div key={order.orderNo}>
					{order.isDone !== false && order.status === "Sales failed" && (
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
		</div>
	);
};

export default Converted;
