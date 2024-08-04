"use client";
import React from "react";
import LogoInForm from "@/components/LogoInForm";
import ForgotForm from "@/components/ForgotForm";

const ForgotPasswordForm = () => {
	return (
		<main className="min-h-screen flex flex-col items-center max-w-sm mx-auto bg-white gap-10">
			<LogoInForm />
			<ForgotForm />
		</main>
	);
};

export default ForgotPasswordForm;
