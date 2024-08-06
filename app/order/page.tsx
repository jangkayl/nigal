import React from "react";
import { Metadata } from "next";
import OrderList from "@/components/orderList/OrderList";
import { getSessionUser } from "@/lib/actions/user.action";
import { getAllUserOrder } from "@/lib/actions/prize.action";

export const metadata: Metadata = {
	title: `My order`,
};

const Points = async () => {
	const user = await getSessionUser();
	const asd = await getAllUserOrder(user?.user.id);
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
			<OrderList orders={asd} />
		</main>
	);
};

export default Points;
