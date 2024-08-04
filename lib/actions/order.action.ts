"use server";
import db from "@/db/drizzle";
import { prizes } from "@/db/schema";
import { randomInt } from "crypto";
import { desc, notInArray } from "drizzle-orm";

// Track if the cron job is initialized
let isCronJobInitialized = false;
// Store the interval ID
let cronJobIntervalId: NodeJS.Timeout | null = null;
// Store the timeout ID for initial delay
let initialTimeoutId: NodeJS.Timeout | null = null;
// Flag to control stopping the job
let stopJob = false;
// Promise to track the current job's completion
let currentJobPromise: Promise<void> | null = null;

// ADD PRIZES ASYNC
export const addPrizeWithRandomNumber = async () => {
	const random_number = randomInt(1, 81);
	const number = random_number;
	const result_value = random_number % 2 === 0 ? 0 : 1;
	const result =
		random_number % 2 === 0 ? `Even&${random_number}` : `Odd&${random_number}`;

	try {
		console.log("Inserting prize:", { number, result_value, result });
		await db.insert(prizes).values({
			number,
			result_value,
			result,
		});
		console.log("Prize added successfully with random number:", random_number);
	} catch (error) {
		console.error("Error inserting prize:", error);
	}
};

// Function to delete records exceeding the limit of 50 items
export const deleteExcessRecords = async () => {
	try {
		// Fetch the IDs of the most recent 50 records
		const recentPrizes = await db
			.select()
			.from(prizes)
			.orderBy(desc(prizes.serial))
			.limit(50);
		const recentIds = recentPrizes.map((prize) => prize.serial);

		// Delete records not in the recentIds
		if (recentIds.length > 0) {
			await db.delete(prizes).where(notInArray(prizes.serial, recentIds));
			console.log("Excess records deleted successfully.");
		} else {
			console.log("No records to delete.");
		}
	} catch (error) {
		console.error("Error deleting excess records:", error);
	}
};

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
	if (stopJob) return; // Exit if stop flag is set

	try {
		console.log("Cron job started at", new Date().toISOString());
		await addPrizeWithRandomNumber();
		if (stopJob) return; // Check stop flag after async operation
		await deleteExcessRecords();
		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

// Initialize and start the cron job
export const startCronJob = () => {
	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		return;
	}

	isCronJobInitialized = true;
	stopJob = false;

	// Set up the job to run every minute
	const interval = 60000; // 60,000 milliseconds (1 minute)

	initialTimeoutId = setTimeout(async () => {
		if (stopJob) return; // Exit if stop flag is set before starting the initial job

		await job(); // Execute the initial job
		if (stopJob) return; // Check stop flag after initial job execution

		cronJobIntervalId = setInterval(async () => {
			if (stopJob) {
				clearInterval(cronJobIntervalId as any);
				cronJobIntervalId = null;
				return;
			}

			// Wait for the current job to finish before starting a new one
			if (currentJobPromise) await currentJobPromise;
			currentJobPromise = job();
			await currentJobPromise;
		}, interval);
	}, getDelayToNextMinute());

	console.log("Cron job scheduled to start.");
};

// Function to stop the cron job
export const stopCronJob = async () => {
	stopJob = true;

	// Clear the interval and timeout if they exist
	if (cronJobIntervalId) {
		clearInterval(cronJobIntervalId);
		cronJobIntervalId = null;
	}

	if (initialTimeoutId) {
		clearTimeout(initialTimeoutId);
		initialTimeoutId = null;
	}

	// Wait for any ongoing job to complete
	if (currentJobPromise) {
		await currentJobPromise;
		console.log("Cron job stopped.");
	} else {
		console.log("Cron job stopped.");
	}

	isCronJobInitialized = false;
};
