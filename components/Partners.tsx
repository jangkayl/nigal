"use client";
import Image from "next/image";
import React from "react";
import gcash from "@/public/gcash.jpeg";
import youtube from "@/public/youtube.png";
import { useRouter } from "next/navigation";

const Partners = () => {
	const router = useRouter();
	return (
		<div className="py-2 px-1">
			<p>Partners</p>
			<div className="py-1 flex gap-3 justify-center items-center">
				<button
					onClick={() => router.push("https://www.gcash.com/")}
					className="w-[10rem] h-auto">
					<Image
						src={gcash}
						width="0"
						height="0"
						sizes="100vw"
						className="w-[10rem] h-auto rounded-md"
						alt="partners"
						placeholder="blur"
						quality={100}
					/>
				</button>
				<button
					onClick={() => router.push("https://www.youtube.com/")}
					className="w-[10rem] h-auto">
					<Image
						src={youtube}
						width="0"
						height="0"
						quality={100}
						sizes="100vw"
						className="w-[10rem] h-auto rounded-md"
						alt="partners"
						placeholder="blur"
					/>
				</button>
			</div>
		</div>
	);
};

export default Partners;
