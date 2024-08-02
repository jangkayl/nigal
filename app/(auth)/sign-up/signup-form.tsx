"use client";
import React, { useEffect, useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/lib/actions/user.action";
import { useRouter, useSearchParams } from "next/navigation";
import { signUpDefaultValues } from "@/lib/constants";

const RegisterForm = () => {
	const [fIsOpen, setFIsOpen] = useState(false);
	const [sIsOpen, setSIsOpen] = useState(false);

	const [data, action] = useFormState(signUp, {
		success: false,
		message: "",
	});

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const router = useRouter();

	useEffect(() => {
		if (data.success) {
			router.push(`/sign-in?callbackUrl=${callbackUrl}`);
		}
	}, [data.success, router, callbackUrl]);

	const SignUpButton = () => {
		const { pending } = useFormStatus();
		return (
			<button
				type="submit"
				disabled={pending}
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 w-full">
				{pending ? "Submitting..." : "Sign Up"}
			</button>
		);
	};

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
			<form
				className="flex flex-col gap-3"
				action={action}>
				<input
					type="hidden"
					name="callbackUrl"
					value={callbackUrl}
				/>
				<div className="flex items-center border-b-2 py-2">
					<MdPhoneAndroid size={20} />
					<p className="pr-1">+63</p>
					<input
						required
						type="number"
						name="phone"
						className="outline-none px-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="9**********"
						defaultValue={signUpDefaultValues.phone}
					/>
				</div>
				<div className="flex items-center border-b-2 py-2">
					<BiSolidLock size={20} />
					<input
						type={fIsOpen ? "text" : "password"}
						name="password"
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						required
						placeholder="Password"
						defaultValue={signUpDefaultValues.password}
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
						name="confirmPassword"
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						required
						placeholder="Confirm password"
						defaultValue={signUpDefaultValues.confirmPassword}
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
				<SignUpButton />
			</form>
			{!data.success && (
				<div className="text-center text-red-400 text-sm px-12">
					{data.message}
				</div>
			)}
			<p className="text-gray-400 text-sm">
				Have an existing account?{" "}
				<Link
					href={`/sign-in?callbackUrl=${callbackUrl}`}
					className="text-sky-500 text-sm">
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterForm;
