"use client";
import { useState, useEffect } from "react";

const Countdown = () => {
	const [countdown, setCountdown] = useState<string>("00:00");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const nextMinute = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours(),
				now.getMinutes() + 1,
				0,
				0
			);

			const diff = Math.max((nextMinute.getTime() - now.getTime()) / 1000, 0);

			const minutes = Math.floor(diff / 60);
			const seconds = Math.floor(diff % 60);

			const formattedMinutes = String(minutes).padStart(2, "0");
			const formattedSeconds = String(seconds).padStart(2, "0");

			setCountdown(`${formattedMinutes}:${formattedSeconds}`);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center p-24 gap-3">
			<div className="flex flex-col items-center gap-3">
				<div className="text-xl">Next job in: {countdown}</div>
			</div>
		</main>
	);
};

export default Countdown;
