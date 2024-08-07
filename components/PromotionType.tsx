import Image from "next/image";
import React from "react";
import evenorodd from "@/public/evenorodd.png";
import guessnumber from "@/public/guessnumber.png";

const PromotionType = () => {
	return (
		<div className="py-5 px-1">
			<p>Promotion Type</p>
			<div className="py-3 flex gap-3 justify-center">
				<button className="w-[10rem] h-auto">
					<Image
						src={evenorodd}
						width="0"
						height="0"
						sizes="100vw"
						className="w-[10rem] h-auto rounded-md"
						alt="promotion"
						placeholder="blur"
					/>
				</button>
				<button className="w-[10rem] h-auto">
					<Image
						src={guessnumber}
						width="0"
						height="0"
						sizes="100vw"
						className="w-[10rem] h-auto rounded-md"
						alt="promotion"
						placeholder="blur"
					/>
				</button>
			</div>
		</div>
	);
};

export default PromotionType;
