"use client";
import { startCronJob, stopCronJob } from "@/lib/actions/prizeAuto.action";
import React from "react";

const Active = () => {
	return (
		<div>
			<button onClick={() => startCronJob()}>Start Cron</button>
			<br />
			<button onClick={() => stopCronJob()}>Stop Cron</button>
		</div>
	);
};

export default Active;
