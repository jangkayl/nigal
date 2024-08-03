"use server";
import db from "@/db/drizzle";
import { prizes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { addPrizeWithRandomNumber, deleteExcessRecords } from "./order.action";

// GET ALL PRIZES
export const getAllPrizes = async () => {
	try {
		const result = await db.select().from(prizes).orderBy(desc(prizes.serial));
		return result;
	} catch (error) {
		console.error("Error fetching prizes:", error);
		return [];
	}
};

// Track if the cron job is initialized
let isCronJobInitialized = false;

function getDelayToNextMinute(): number {
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
	return nextMinute.getTime() - now.getTime();
}

// Cron job function
const job = async () => {
	try {
		console.log("Cron job started at", new Date().toISOString());
		await addPrizeWithRandomNumber();
		await deleteExcessRecords();
		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

// Initialize and start the cron job
const startCronJob = () => {
	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		return;
	}

	isCronJobInitialized = true;

	// Set up the job to run every minute
	const interval = 60000; // 60,000 milliseconds (1 minute)

	setTimeout(async () => {
		await job(); // Run immediately after the initial delay
		setInterval(async () => {
			await job();
		}, interval);
	}, getDelayToNextMinute());

	console.log("Cron job scheduled to start.");
};

// Start the cron job
// startCronJob();
