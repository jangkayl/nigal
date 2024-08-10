"use client";
import { signInDefaultValues } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { MdPhoneAndroid, MdLock } from "react-icons/md";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import { signInWithCredentials } from "@/lib/actions/user.action";

export default function CredentialsSignInForm() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [data, action] = useFormState(signInWithCredentials, {
		success: false,
		message: "",
	});
	const [formValues, setFormValues] = useState({
		phone: signInDefaultValues.phone,
		password: signInDefaultValues.password,
	});

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callback") || "/user";

	const SignInButton = () => {
		const { pending } = useFormStatus();
		return (
			<button
				disabled={pending}
				type="submit"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 w-full">
				{pending ? "Submitting..." : "Login"}
			</button>
		);
	};

	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
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
						name="phone"
						required
						className="outline-none px-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="Enter your phone number"
						defaultValue={signInDefaultValues.phone}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex items-center border-b-2 py-2">
					<MdLock size={20} />
					<input
						type={isOpen ? "text" : "password"}
						name="password"
						required
						className="outline-none px-2 pl-2 overscroll-x-none w-[14rem] font-normal"
						placeholder="Fill in your password"
						defaultValue={signInDefaultValues.password}
						onChange={handleInputChange}
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
				<div className="w-full">
					{data && !data.success && (
						<div className="text-center text-red-500 pt-1 pb-3 text-sm">
							{data.message}
						</div>
					)}
					<SignInButton />
					<p className="text-gray-400 text-right">
						<button
							onClick={() => router.push("/forgot-password")}
							className="text-sky-500 text-sm">
							Forgot password
						</button>
					</p>
				</div>
			</form>
			<p className="text-gray-400 text-sm">
				No account yet?{" "}
				<button
					onClick={() =>
						router.push(
							`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`
						)
					}
					className="text-sky-500 text-sm">
					Register
				</button>
			</p>
		</div>
	);
}
