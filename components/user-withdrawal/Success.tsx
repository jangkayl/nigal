import React from "react";
import Image from "next/image";
import success from "@/public/withdrawalsuccess.png";
import Link from "next/link";

const Success = () => {
	function formatCurrentDateTime(): string {
		const today = new Date();

		const months = today.getMonth() + 1; // January is 0
		const days = today.getDate();
		const year = today.getFullYear();

		let hours = today.getHours();
		const minutes = today.getMinutes();
		const seconds = today.getSeconds();

		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'

		const formattedDate = `${months.toString().padStart(2, "0")}/${days
			.toString()
			.padStart(2, "0")}/${year}`;
		const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

		return `${formattedDate}, ${formattedTime}`;
	}

	return (
		<div>
			<div className="justify-center flex flex-col items-center bg-white w-[22rem] text-center gap-2 pb-8">
				<div className="w-[7rem] pt-10">
					<Image
						src={success}
						sizes="100vw"
						width={0}
						height={0}
						quality={100}
						alt="success"
					/>
				</div>
				<p>Withdrawal has been submitted, waiting for review</p>
				<p className="text-gray-400 pb-5">{formatCurrentDateTime()}</p>
				<Link
					href={"/user"}
					className="bg-red-500 text-white w-[10rem] py-2 rounded-full">
					Sure
				</Link>
			</div>
		</div>
	);
};

export default Success;
