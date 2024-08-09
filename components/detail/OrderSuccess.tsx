"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import image1 from "@/public/image1.jpg";
import SuccessReceipt from "./SuccessReceipt";
import { orderType } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { allGoodsData } from "@/lib/sample-data";
import Link from "next/link";

interface Props {
	result?: orderType;
}

const OrderSuccess = ({ result }: Props) => {
	const router = useRouter();

	const index = allGoodsData.prices.findIndex(
		(item) => item.cost === result?.cost
	);

	return (
		<div className="w-full flex flex-col gap-2 text-sm">
			<div className="py-3 bg-white flex justify-center items-center fixed top-0 max-w-sm w-full">
				<IoIosArrowBack
					size={20}
					className="cursor-pointer absolute left-3"
					onClick={() => router.push("/order")}
				/>
				<p>Order details</p>
			</div>
			<div className="px-3 py-3 bg-white mt-[50px]">
				<p className="font-semibold">
					Seller has not send product yet, please kindly wait
				</p>
				<p className="text-xs">{formatDateTime(result?.time)}</p>
			</div>
			<div>
				<div className="px-3 py-3 bg-white border-b">
					<p>1 Item</p>
				</div>
				<div className="px-4 py-3 bg-white flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-auto w-auto">
							<Image
								src={result?.image || image1}
								alt="success"
								width={70}
								height={70}
								className="rounded-md"
								quality={100}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<p>{result?.returns}</p>
							<p className="text-xs text-red-500">₱{result?.cost}</p>
						</div>
					</div>
					<p className="text-gray-400">x {result?.item}</p>
				</div>
			</div>
			<SuccessReceipt result={result} />
			<div className="fixed bottom-0 p-3 bg-white max-w-sm w-full">
				<div className="text-end">
					<Link
						href={`/detail/${index + 1}`}
						className="py-1 px-3 text-yellow-500 border-yellow-500 border rounded-md">
						Re-order
					</Link>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccess;
