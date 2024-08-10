import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./sandbox.css";
import "./embla.css";
import UserNavigation from "@/components/UserNavigation";
import { ModalProvider } from "@/components/ModalContext";
import StartCronJob from "@/components/StartCronJob";
import React from "react";

export const dynamic = "force-dynamic";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Nigal",
	description: "Nigal Now is a free casino online",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					href="/site.webmanifest"
				/>
			</head>
			<body className={`${poppins.className} smooth-scroll`}>
				<ModalProvider>
					{children}
					<StartCronJob />
				</ModalProvider>
				<UserNavigation />
			</body>
		</html>
	);
}
