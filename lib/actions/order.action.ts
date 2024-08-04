"use server";
import db from "@/db/drizzle";
import { prizes } from "@/db/schema";
import { randomInt } from "crypto";
import { desc, notInArray } from "drizzle-orm";

let isCronJobInitialized = false;
let cronJobIntervalId: NodeJS.Timeout | null = null;
let initialTimeoutId: NodeJS.Timeout | null = null;
let stopJob = false;
let currentJobPromise: Promise<void> | null = null;

export const addPrizeWithRandomNumber = async () => {
	const random_number = randomInt(1, 101);
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

export const deleteExcessRecords = async () => {
	try {
		const recentPrizes = await db
			.select()
			.from(prizes)
			.orderBy(desc(prizes.serial))
			.limit(50);
		const recentIds = recentPrizes.map((prize) => prize.serial);

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

const job = async () => {
	if (stopJob) return;

	try {
		console.log("Cron job started at", new Date().toISOString());
		await addPrizeWithRandomNumber();
		if (stopJob) return;
		await deleteExcessRecords();
		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

export const startCronJob = () => {
	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		return;
	}

	isCronJobInitialized = true;
	stopJob = false;

	initialTimeoutId = setTimeout(async () => {
		if (stopJob) return;

		await job();
		if (stopJob) return;

		cronJobIntervalId = setInterval(async () => {
			if (stopJob) {
				clearInterval(cronJobIntervalId as any);
				cronJobIntervalId = null;
				return;
			}

			if (currentJobPromise) await currentJobPromise;
			currentJobPromise = job();
			await currentJobPromise;
		}, 60000);
	}, getDelayToNextMinute());

	console.log("Cron job scheduled to start.");
};

export const stopCronJob = async () => {
	stopJob = true;

	if (cronJobIntervalId) {
		clearInterval(cronJobIntervalId);
		cronJobIntervalId = null;
	}

	if (initialTimeoutId) {
		clearTimeout(initialTimeoutId);
		initialTimeoutId = null;
	}

	if (currentJobPromise) {
		await currentJobPromise;
	}

	isCronJobInitialized = false;
	console.log("Cron job stopped.");
};
