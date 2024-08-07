"use client";
import React, { useEffect, useState } from "react";
import Operated from "./Operated";
import { orderType } from "@/types";
import Image from "next/image";
import { getAllUserOrder } from "@/lib/actions/prize.action";
import { getSessionUser } from "@/lib/actions/user.action";
import Converted from "./Converted";
import Refund from "./Refund";

const OrderList = () => {
	const [selected, setSelected] = useState("operated");
	const [modal, setModal] = useState(false);
	const [orders, setOrders] = useState<orderType[] | undefined>(undefined);

	useEffect(() => {
		const fetchOrders = async () => {
			const user = await getSessionUser();
			if (user?.user.id) {
				const res = await getAllUserOrder(user.user.id);
				setOrders(res.length > 0 ? res : undefined);
			}
		};

		fetchOrders();
	}, [modal]);

	const renderContent = () => {
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

		const components: any = {
			operated: (
				<Operated
					orders={orders}
					modal={modal}
					setModal={setModal}
				/>
			),
			converted: <Converted orders={orders} />,
			refund: <Refund orders={orders} />,
		};

		return components[selected] || null;
	};

	return (
		<div className="w-full text-xs">
			<div className="pb-1 border-b bg-white fixed top-0 max-w-sm w-full">
				<p className="py-4 w-full text-center bg-white text-sm">My Order</p>
				<div className="flex justify-evenly items-center bg-white">
					{["operated", "converted", "refund"].map((tab) => (
						<button
							key={tab}
							onClick={() => setSelected(tab)}
							className={`${
								selected === tab ? "font-semibold border-b border-blue-500" : ""
							} pb-2`}>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>
			</div>
			{renderContent()}
		</div>
	);
};

export default OrderList;
