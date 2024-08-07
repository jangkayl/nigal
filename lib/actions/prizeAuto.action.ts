"use server";

import db from "@/db/drizzle";
import { orderSuccess, prizes, users } from "@/db/schema";
import { randomInt } from "crypto";
import { desc, eq, notInArray } from "drizzle-orm";
import { getSessionUser } from "./user.action";
import { getAllUserOrder, updateSuccessOrder } from "./prize.action";
import { orderType } from "@/types";

let isCronJobInitialized = false;
let cronJobIntervalId: NodeJS.Timeout | null = null;
let initialTimeoutId: NodeJS.Timeout | null = null;
let stopJob = false;
let currentJobPromise: Promise<void> | null = null;

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
	const delay = nextMinute.getTime() - now.getTime();
	return delay + 2000; // Add 1 second (1000 milliseconds) delay
}

let user = null;
let orders: any = null;

// ADD PRIZES ASYNC
export const addPrizeWithRandomNumber = async () => {
	const randomIn = randomInt(1, 81);
	const random_number = randomInt(1, 81);
	let random = null;

	if (randomIn > random_number) {
		random = randomInt(random_number, randomIn);
	} else {
		random = randomInt(randomIn, random_number);
	}

	const number = random;
	const result_value = number % 2 === 0 ? 0 : 1;
	const result = number % 2 === 0 ? `Even&${number}` : `Odd&${number}`;

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

// GET LATEST PRIZE RESULT
export const getPrizeResult = async () => {
	const result = await db.query.prizes.findFirst({
		orderBy: desc(prizes.serial),
	});
	return result?.result_value;
};

// GET REDEEM POINTS
export const updateRedeemPoints = async (points: number, orderNo: string) => {
	const user = await getSessionUser();
	const userId = user?.user.id;

	if (!userId) {
		return;
	}

	const userData = await db.query.users.findFirst({
		where: eq(users.id, userId),
	});

	const currentPoints: any = userData?.points;

	await db
		.update(users)
		.set({
			points: currentPoints + points,
		})
		.where(eq(users.id, userId));

	console.log("Deduct successfull: ", currentPoints);

	await db
		.update(orderSuccess)
		.set({
			isDone: true,
		})
		.where(eq(orderSuccess.orderNo, orderNo));

	console.log("IsDone true");
};

// GET REFUND
export const updateRefund = async (balance: number, orderNo: string) => {
	const user = await getSessionUser();
	const userId = user?.user.id;

	if (!userId) {
		return;
	}

	const userData = await db.query.users.findFirst({
		where: eq(users.id, userId),
	});

	const currentBalance: any = userData?.balance;

	// Calculate the refund amount minus 2%
	const refundAmount = balance * 0.98;
	const newBalance = currentBalance + refundAmount;

	await db
		.update(users)
		.set({
			balance: newBalance,
		})
		.where(eq(users.id, userId));

	console.log("Refund successful, new balance: ", newBalance);

	await db
		.update(orderSuccess)
		.set({
			isDone: true,
		})
		.where(eq(orderSuccess.orderNo, orderNo));

	console.log("Order marked as done");
};

// Cron job function
const job = async () => {
	if (stopJob) return; // Exit if stop flag is set

	try {
		console.log("Cron job started at", new Date().toISOString());
		await addPrizeWithRandomNumber();
		user = await getSessionUser();
		orders = await getAllUserOrder(user?.user.id);

		orders.map((order: any) => {
			if (order.status === "Waiting for draw") {
				const update = async () => await updateOrderStatus(order);
				update();
				console.log("Update done");
			}
		});

		if (stopJob) return; // Check stop flag after async operation
		await deleteExcessRecords();

		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

// Initialize and start the cron job
export const startCronJob = async () => {
	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		user = await getSessionUser();
		orders = await getAllUserOrder(user?.user.id);
		console.log("Fetched orders:", orders);

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
export const stopCronJob = () => {
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
		currentJobPromise.finally(() => {
			console.log("Cron job stopped.");
		});
	} else {
		console.log("Cron job stopped.");
	}

	isCronJobInitialized = false;
};

export const updateOrderStatus = async (order: orderType) => {
	await updateSuccessOrder(order);
	window.location.reload();
};
