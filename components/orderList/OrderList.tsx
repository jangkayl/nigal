"use client";
import React, { useEffect, useState } from "react";
import Operated from "./Operated";
import { orderType } from "@/types";
import { getAllUserOrder } from "@/lib/actions/prize.action";
import { getSessionUser } from "@/lib/actions/user.action";
import Converted from "./Converted";
import Refund from "./Refund";

const OrderList = () => {
	const [selected, setSelected] = useState("operated");
	const [modal, setModal] = useState(false);
	const [orders, setOrders] = useState<orderType[] | undefined>(undefined);
	const [operatedOrders, setOperatedOrders] = useState<orderType[] | undefined>(
		undefined
	);
	const [convertedOrders, setConvertedOrders] = useState<
		orderType[] | undefined
	>(undefined);
	const [refundOrders, setRefundOrders] = useState<orderType[] | undefined>(
		undefined
	);

	useEffect(() => {
		const fetchOrders = async () => {
			const user = await getSessionUser();
			if (user?.user.id) {
				const res = await getAllUserOrder(user.user.id);
				if (res.length > 0) {
					setOrders(res);
					setOperatedOrders(filterOperatedOrders(res));
					setConvertedOrders(filterConvertedOrders(res));
					setRefundOrders(filterRefundOrders(res));
				} else {
					setOrders(undefined);
				}
			}
		};

		fetchOrders();
	}, [modal]);

	const filterOperatedOrders = (orders: orderType[]) => {
		return orders.filter((order) => !order.isDone);
	};

	const filterConvertedOrders = (orders: orderType[]) => {
		return orders.filter(
			(order) => order.isDone && order.status === "Sales failed"
		);
	};

	const filterRefundOrders = (orders: orderType[]) => {
		return orders.filter(
			(order) => order.isDone && order.status === "Sales success"
		);
	};

	const renderContent = () => {
		const components: { [key: string]: JSX.Element } = {
			operated: (
				<Operated
					orders={operatedOrders}
					modal={modal}
					setModal={setModal}
				/>
			),
			converted: <Converted orders={convertedOrders} />,
			refund: <Refund orders={refundOrders} />,
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
