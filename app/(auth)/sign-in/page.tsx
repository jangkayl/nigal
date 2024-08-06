import LogoInForm from "@/components/LogoInForm";
import { redirect } from "next/navigation";
import React from "react";
import CredentialsSignInForm from "./credentials-signin-form";
import { getSessionUser } from "@/lib/actions/user.action";

const SignIn = async ({
	searchParams: { callbackUrl },
}: {
	searchParams: {
		callbackUrl: string;
	};
}) => {
	const session = await getSessionUser();
	if (session) {
		return redirect(callbackUrl || "/user");
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-white gap-10">
			<LogoInForm />
			<CredentialsSignInForm />
		</main>
	);
};

export default SignIn;
