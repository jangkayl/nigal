import OrderSuccess from "@/components/detail/OrderSuccess";
import PageNotFound from "@/components/PageNotFound";
import { getOrderById } from "@/lib/actions/prize.action";
import { getSessionUser } from "@/lib/actions/user.action";
import React from "react";

const getMetadata = (isValid: boolean) => ({
	title: isValid ? "Order Detail" : "Page Not Found",
});

const Prize = async ({ params }: any) => {
	const user = await getSessionUser();
	const res = await getOrderById(params.params);

	const isValid =
		(res && params?.params === res.orderNo && user?.user.id === res.userId) ||
		false;

	const { title } = getMetadata(isValid);

	return (
		<>
			<title>{title}</title>
			<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
				{isValid ? <OrderSuccess result={res} /> : <PageNotFound />}
			</main>
		</>
	);
};

export default Prize;
