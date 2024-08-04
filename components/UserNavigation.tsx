"use client";
import React from "react";
import { TbDiamond } from "react-icons/tb";
import { RiVipCrown2Line, RiFileList2Line, RiHome3Line } from "react-icons/ri";
import { PiUserBold } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserNavigation = () => {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	const shouldShowNavigation = [
		"/",
		"/points",
		"/vip_zone",
		"/order",
		"/user",
	].includes(pathname);

	if (!shouldShowNavigation) {
		return null;
	}

	return (
		<div className="bg-white border-t-2 py-2 px-5 border w-full text-xs flex justify-between max-w-sm mx-auto items-center fixed bottom-0 left-0 right-0">
			<Link
				href="/"
				className={`flex flex-col items-center gap-1 ${
					isActive("/") ? "text-blue-500" : "text-gray-500"
				}`}>
				<RiHome3Line size={23} />
				Home
			</Link>
			<Link
				href="/points"
				className={`flex flex-col items-center gap-1 ${
					isActive("/points") ? "text-blue-500" : "text-gray-500"
				}`}>
				<TbDiamond size={23} />
				Points
			</Link>
			<Link
				href="/vip_zone"
				className={`flex flex-col items-center gap-1 ${
					isActive("/vip_zone") ? "text-blue-500" : "text-gray-500"
				}`}>
				<RiVipCrown2Line size={23} />
				VIP Zone
			</Link>
			<Link
				href="/order"
				className={`flex flex-col items-center gap-1 ${
					isActive("/order") ? "text-blue-500" : "text-gray-500"
				}`}>
				<RiFileList2Line size={23} />
				Order
			</Link>
			<Link
				href="/user"
				className={`flex flex-col items-center gap-1 ${
					isActive("/user") ? "text-blue-500" : "text-gray-500"
				}`}>
				<PiUserBold size={23} />
				Account
			</Link>
		</div>
	);
};

export default UserNavigation;
