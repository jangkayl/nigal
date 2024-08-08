import { formatDateTime } from "@/lib/utils";
import { orderType } from "@/types";
import React, { useState } from "react";
import CopiedModal from "./CopiedModal";

interface Props {
	result?: orderType;
}

const SuccessReceipt = ({ result }: Props) => {
	const [copied, setCopied] = useState(false);

	const handleCopyOrderNo = () => {
		if (result?.orderNo) {
			navigator.clipboard
				.writeText(result?.orderNo.split("-").pop() || "")
				.then(() => {
					setCopied(true);
				})
				.catch((err) => {
					console.error("Failed to copy order number: ", err);
				});
		}
	};

	const handleClose = () => {
		setCopied(false);
	};

	return (
		<>
			<div className="p-3 bg-white flex flex-col gap-1">
				<div className="flex justify-between items-center">
					<p>Order No.:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.orderNo.split("-").pop()}</p>
						<button
							className="px-1 border text-xs"
							onClick={handleCopyOrderNo}>
							Copy
						</button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Order time:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{formatDateTime(result?.time)}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Type of order:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>Normal order</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Status payment:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>Have to pay</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Promotion status:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.result_serial ? result?.result_serial + 1 : ""}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Lottery number:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.result_number}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Promotion period:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.status}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Promotion games:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.games}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Opening time:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{formatDateTime(result?.opening_time || "")}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>My choice:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>{result?.my_choice}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p>Payment Method:</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>Balance payment</p>
					</div>
				</div>
			</div>
			<div className="p-3 bg-white flex flex-col gap-1 mb-11">
				<div className="flex justify-between items-center border-b pb-3 pt-1">
					<p>Total Amount</p>
					<div className="flex gap-3 items-center text-gray-400">
						<p>₱{result?.total}.00</p>
					</div>
				</div>
				<div className="text-end pt-3">
					<p>
						Amount paid:{" "}
						<span className="font-semibold text-red-500">
							₱
							{result?.status === "Sales success"
								? result.total / 2
								: result?.total}
							.00
						</span>
					</p>
				</div>
			</div>
			<CopiedModal
				isVisible={copied}
				onClose={handleClose}
			/>
		</>
	);
};

export default SuccessReceipt;
