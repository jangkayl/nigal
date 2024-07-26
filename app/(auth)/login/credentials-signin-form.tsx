"use client";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { MdPhoneAndroid } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { TbEye } from "react-icons/tb";

export default function CredentialsSignInForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [data, action] = useFormState(signInWithCredentials, {
		message: "",
		success: false,
	});

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callback") || "/";

	const SignInButton = () => {
		const { pending } = useFormStatus();
		return (
			<button
				disabled={pending}
				type="button"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 w-full">
				{pending ? "Submitting..." : "Login"}
			</button>
		);
	};

	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="font-semibold text-xl border-b-[3px] pb-2 border-sky-400">
				Account Login
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
						type="number"
						className="outline-none px-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="Enter your phone number"
						defaultValue={signInDefaultValues.phone}
					/>
				</div>
				<div className="flex items-center border-b-2 py-2">
					<MdLock size={20} />
					<input
						type={isOpen ? "text" : "password"}
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="Fill in your password"
						defaultValue={signInDefaultValues.password}
					/>
					{isOpen ? (
						<TbEye
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleIsOpen}
						/>
					) : (
						<TbEyeClosed
							size={25}
							className="cursor-pointer text-gray-400"
							onClick={handleIsOpen}
						/>
					)}
				</div>
			</form>
			<div className="w-full">
				<SignInButton />
				<p className="text-gray-400 text-right">
					<Link
						href="/forgot-password"
						className="text-sky-500 text-sm">
						Forgot password
					</Link>
				</p>
			</div>
			{data && !data.success && (
				<div className="text-center text-red-500">{data.message}</div>
			)}
			{!data && (
				<div className="text-center text-red-500">
					Unknown error happend.{" "}
					<button onClick={() => window.location.reload()}>
						Please reload
					</button>
				</div>
			)}
			<p className="text-gray-400 text-sm">
				No account yet?{" "}
				<Link
					href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
					className="text-sky-500 text-sm">
					Register
				</Link>
			</p>
		</div>
	);
}
