import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const LogoInForm = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="w-24 h-auto mt-14 pb-1">
				<Image
					src={logo}
					alt="logo"
					width="0"
					height="0"
					sizes="100vw"
					className="w-[10rem] h-auto rounded-md"
					placeholder="blur"
					quality={100}
					priority={true}
				/>
			</div>
			Nigal
		</div>
	);
};

export default LogoInForm;
