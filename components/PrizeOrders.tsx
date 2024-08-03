"use client";
import { getAllPrizes } from "@/lib/actions/prize.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import DraggableButton from "./Draggable";
import PrizeChart from "./PrizeChart";

const PrizeOrders = () => {
	const [prizes, setPrizes] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const fetchPrizes = async () => {
		const data = await getAllPrizes();
		setPrizes(data);
	};

	useEffect(() => {
		fetchPrizes();
	}, []);

	const formatDate = (date: Date | string) => {
		let dt: Date;

		if (typeof date === "string") {
			dt = new Date(date);
		} else {
			dt = date;
		}

		const month = dt.getMonth() + 1;
		const day = dt.getDate();
		const hours = dt.getHours().toString().padStart(2, "0");
		const minutes = dt.getMinutes().toString().padStart(2, "0");

		return `${month.toString().padStart(2, "0")}-${day
			.toString()
			.padStart(2, "0")} ${hours}:${minutes}`;
	};

	return (
		<>
			{prizes.length ? (
				<DraggableButton
					open={open}
					setOpen={setOpen}
				/>
			) : null}

			<div className="w-full">
				<div className="py-4 w-full text-center relative">
					<IoIosArrowBack
						size={20}
						className="cursor-pointer absolute left-3"
						onClick={() => router.back()}
					/>
					<p>Prize opening record</p>
				</div>
				{open ? (
					<PrizeChart />
				) : (
					<div>
						<div className="w-full bg-sky-300 text-white">
							<div className="grid grid-cols-4 py-3 text-center text-sm">
								<p className="border-r border-white">Opening time</p>
								<p className="border-r border-white">Issue</p>
								<p className="border-r border-white">Number</p>
								<p>Results</p>
							</div>
						</div>
						<div className="w-full max-h-[84vh] overflow-y-auto scrollbar-hide">
							{prizes.length > 0 ? (
								prizes.map((prize, index) => (
									<div
										key={index}
										className="w-full border-b">
										<div className="grid grid-cols-4 py-2 items-center justify-center text-center text-sm">
											<p>{formatDate(prize.time)}</p>
											<p>{prize.serial}</p>
											<p>{prize.number}</p>
											<div className="flex justify-center">
												<p className={`bg-yellow-300 py-1 w-24 rounded-md`}>
													{prize.result}
												</p>
											</div>
										</div>
									</div>
								))
							) : (
								<p className="pt-5 text-center">Loading...</p>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default PrizeOrders;
