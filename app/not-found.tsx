"use client";
import { Metadata } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: `Page not found`,
};

const PageNotFound = () => {
	const router = useRouter();
	return (
		<div className="w-full max-w-sm bg-white mx-auto h-screen">
			<div className="flex justify-center items-center flex-col min-h-[80vh]">
				<Image
					src="https://www.im2015.com/h5/img/404.c67ac50c.png"
					alt="bg"
					width={300}
					height={100}
					quality={100}
				/>
				<div className="flex text-center justify-center items-center flex-col gap-5">
					<p className="font-semibold">Page not found</p>
					<p className="text-xs text-center max-w-[15rem]">
						Sorry! This page is not available, please click back or click the
						button below to return to homepage...
					</p>
					<button
						onClick={() => router.push("/")}
						className="py-2 px-5 bg-red-600 text-white rounded-full text-sm">
						Back home
					</button>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
