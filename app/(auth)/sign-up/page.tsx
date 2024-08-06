import LogoInForm from "@/components/LogoInForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "./signup-form";
import { getSessionUser } from "@/lib/actions/user.action";

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
	const session = await getSessionUser();
	if (session) {
		return redirect(callbackUrl || "/");
	}

	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-white gap-10">
			<LogoInForm />
			<RegisterForm />
		</main>
	);
};

export default Register;
