import { auth } from "@/auth";
import LogoInForm from "@/components/LogoInForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "./signup-form";

export const metadata: Metadata = {
	title: `Sign Up - Nigal`,
};

const Register = async ({
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
			<RegisterForm />
		</main>
	);
};

export default Register;
