"use client";
import { useEffect } from "react";
import { useModalState } from "@/components/ModalContext";
import { startCronJob, stopCronJob } from "@/lib/utils";

const StartCronJob = () => {
	const { state, setState } = useModalState();

	useEffect(() => {
		startCronJob();

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

			const diff = Math.max(
				(nextMinute.getTime() - now.getTime() + 1000) / 1000,
				0
			);

			const minutes = Math.floor(diff / 60);
			const seconds = Math.floor(diff % 60);

			const formattedMinutes = String(minutes).padStart(2, "0");
			const formattedSeconds = String(seconds).padStart(2, "0");

			setState((prevState) => ({
				...prevState,
				countdown: `${formattedMinutes}:${formattedSeconds}`,
			}));
		}, 1000);

		return () => clearInterval(interval);
	}, [setState]);

	return null;
};

export default StartCronJob;
