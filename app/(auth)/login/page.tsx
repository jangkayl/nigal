import React from "react";
import LogoInForm from "@/components/LogoInForm";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
	title: `Sign In - NiGal`,
};

const Login = async ({
	searchParams: { callbackUrl },
}: {
	searchParams: { callbackUrl: string };
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

export default Login;
