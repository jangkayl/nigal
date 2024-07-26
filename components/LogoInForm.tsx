import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const LogoInForm = () => {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={logo}
				alt="logo"
				className="w-20 mt-14 pb-1"
			/>
			Nigal
		</div>
	);
};

export default LogoInForm;
