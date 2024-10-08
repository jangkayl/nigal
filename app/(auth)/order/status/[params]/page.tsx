import PageNotFound from "@/app/not-found";
import PaymentSuccess from "@/components/detail/PaymentSuccess";
import { getOrderById } from "@/lib/actions/prize.action";
import { getSessionUser } from "@/lib/actions/user.action";
import React from "react";

const getMetadata = (isValid: boolean) => ({
	title: isValid ? "Order created successfully" : "Page Not Found",
});

const Submit = async ({ params }: any) => {
	const session = await getSessionUser();
	const res = await getOrderById(params.params);

	const isValid =
		(res &&
			params?.params === res.orderNo &&
			session?.user.id === res.userId) ||
		false;

	const { title } = getMetadata(isValid);

	return (
		<>
			<title>{title}</title>
			<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-gray-100 relative">
				{isValid ? <PaymentSuccess result={res} /> : <PageNotFound />}
			</main>
		</>
	);
};

export default Submit;
