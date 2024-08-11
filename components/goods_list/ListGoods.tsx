"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import ListGoodsDashboard from "./ListGoodsDashboard";

const ListGoods = () => {
	const [up, setUp] = useState(false);
	const [down, setDown] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		if (!up && !down) {
			setUp(true);
		} else if (up && !down) {
			setUp(false);
			setDown(true);
		} else {
			setUp(false);
			setDown(false);
		}
	};

	return (
		<>
			<div className="pt-4 pb-2 w-full text-center text-sm bg-white fixed top-0 max-w-sm z-10">
				<div>
					<IoIosArrowBack
						size={20}
						className="cursor-pointer absolute left-3"
						onClick={() => router.back()}
					/>
					<p>List of Goods</p>
				</div>
				<button
					className="pt-3 flex justify-center gap-1 items-center w-full"
					onClick={handleClick}>
					<p>Price</p>
					<div className="flex flex-col">
						<div className="max-h-[.3rem]">
							<RiArrowUpSFill
								size={12}
								className={`${up ? "text-orange-700" : ""}`}
							/>
						</div>
						<RiArrowDownSFill
							size={12}
							className={`${down ? "text-orange-700" : ""}`}
						/>
					</div>
				</button>
			</div>
			<ListGoodsDashboard
				up={up}
				down={down}
			/>
		</>
	);
};

export default ListGoods;
