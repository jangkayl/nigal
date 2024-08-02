import { auth } from "@/auth";
import LogoInForm from "@/components/LogoInForm";
import { redirect } from "next/navigation";
import React from "react";
import CredentialsSignInForm from "./credentials-signin-form";

const SignIn = async ({
	searchParams: { callbackUrl },
}: {
	searchParams: {
		callbackUrl: string;
	};
}) => {
	const session = await auth();
	if (session) {
		return redirect(callbackUrl || "/");
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-white gap-10">
			<LogoInForm />
			<CredentialsSignInForm />
		</main>
	);
};

export default SignIn;
