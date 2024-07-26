import LogoInForm from "@/components/LogoInForm";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-white gap-10">
			<LogoInForm />
			<RegisterForm />
		</main>
	);
};

export default Register;
