"use client";
import React, { useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";

const RegisterForm = () => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [conPass, setConPass] = useState("");
	const [fIsOpen, setFIsOpen] = useState(false);
	const [sIsOpen, setSIsOpen] = useState(false);

	const handleFIsOpen = () => {
		setFIsOpen(!fIsOpen);
	};

	const handleSIsOpen = () => {
		setSIsOpen(!sIsOpen);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="font-semibold text-xl border-b-[3px] pb-2 border-sky-400">
				Register Account
			</p>
			<form className="flex flex-col gap-3">
				<div className="flex items-center border-b-2 py-2">
					<MdPhoneAndroid size={20} />
					<p className="pr-1">+63</p>
					<input
						type="number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="outline-none px-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="9**********"
					/>
				</div>
				<div className="flex items-center border-b-2 py-2">
					<BiSolidLock size={20} />
					<input
						type={fIsOpen ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="Password"
					/>
					{fIsOpen ? (
						<TbEye
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleFIsOpen}
						/>
					) : (
						<TbEyeClosed
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleFIsOpen}
						/>
					)}
				</div>
				<div className="flex items-center border-b-2 py-2">
					<BiSolidLock size={20} />
					<input
						type={sIsOpen ? "text" : "password"}
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						value={conPass}
						onChange={(e) => setConPass(e.target.value)}
						placeholder="Confirm password"
					/>
					{sIsOpen ? (
						<TbEye
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleSIsOpen}
						/>
					) : (
						<TbEyeClosed
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleSIsOpen}
						/>
					)}
				</div>
			</form>
			<button
				type="button"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 w-full">
				Register
			</button>
			<p className="text-gray-400 text-sm">
				Have an existing account?{" "}
				<Link
					href="/login"
					className="text-sky-500 text-sm">
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterForm;
