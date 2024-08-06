"use client";
import React, { useState } from "react";
import Operated from "./Operated";
import { orderType } from "@/types";
import Image from "next/image";

interface Props {
	orders?: orderType[];
}

const OrderList = ({ orders }: Props) => {
	const [selected, setSelected] = useState("");

	console.log(orders);
	return (
		<div className="w-full text-xs">
			<div className="pb-1 border-b bg-white fixed top-0 max-w-sm w-full">
				<p className="py-4 w-full text-center bg-white text-sm">My Order</p>
				<div className="flex justify-evenly items-center bg-white">
					<button
						onClick={() => setSelected("operated")}
						className={`${
							selected === "operated"
								? "font-semibold border-b border-blue-500"
								: ""
						} pb-2`}>
						Operated
					</button>
					<button
						onClick={() => setSelected("received")}
						className={`${
							selected === "received"
								? "font-semibold border-b border-blue-500"
								: ""
						} pb-2`}>
						Received
					</button>
					<button
						onClick={() => setSelected("completed")}
						className={`${
							selected === "completed"
								? "font-semibold border-b border-blue-500"
								: ""
						} pb-2`}>
						Completed
					</button>
					<button
						onClick={() => setSelected("converted")}
						className={`${
							selected === "converted"
								? "font-semibold border-b border-blue-500"
								: ""
						} pb-2`}>
						Converted
					</button>
					<button
						onClick={() => setSelected("refund")}
						className={`${
							selected === "refund"
								? "font-semibold border-b border-blue-500"
								: ""
						} pb-2`}>
						Refund
					</button>
				</div>
			</div>
			{orders?.length !== 0 ? (
				<Operated orders={orders} />
			) : (
				<div className="pt-44 z-10 w-48	mx-auto max-w-sm">
					<Image
						src="https://www.im2015.com/h5/img/noOrder.3770f435.png"
						width={999}
						height={999}
						quality={100}
						alt="background"
					/>
				</div>
			)}
		</div>
	);
};

export default OrderList;
