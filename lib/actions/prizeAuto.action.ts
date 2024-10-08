"use server";
import db from "@/db/drizzle";
import { orderSuccess, prizes, users } from "@/db/schema";
import { randomInt } from "crypto";
import { desc, eq, notInArray } from "drizzle-orm";
import { getSessionUser } from "./user.action";
import {
	getAllPendingOrders,
	setUserOnline,
	updateSuccessOrder,
} from "./prize.action";
import { orderType } from "@/types";

let isCronJobInitialized = false;
let cronJobIntervalId: any = null;
let initialTimeoutId: any = null;
let stopJob = false;
let currentJobPromise: Promise<void> | null = null;

// 1 MINUTE DELAY
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
	return delay + 1000; // Add 1 second (1000 milliseconds) delay
}

// ADD PRIZE RANDOM NUMBER
export const addPrizeWithRandomNumber = async () => {
	const randomIn = randomInt(1, 81);

	const number = randomIn;
	const result_value = number % 2 === 0 ? 0 : 1;
	const result = number % 2 === 0 ? `Even&${number}` : `Odd&${number}`;

	try {
		console.log("Inserting prize:", { number, result_value, result });
		await db.insert(prizes).values({
			number,
			result_value,
			result,
		});
		console.log("Prize added successfully with random number:", number);
	} catch (error) {
		console.error("Error inserting prize:", error);
	}
};

// DELETE EXCESS RECORDS MORE THAN 50
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

// GET LATEST PRIZE RESULT
export const getPrizeResult = async () => {
	const result = await db.query.prizes.findFirst({
		orderBy: desc(prizes.serial),
	});
	return result?.result_value;
};

// UPDATE REDEEM POINTS AFTER LOSING
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

	console.log("Deduct successful: ", currentPoints);

	await db
		.update(orderSuccess)
		.set({
			isDone: true,
		})
		.where(eq(orderSuccess.orderNo, orderNo));

	console.log("IsDone true");
};

// UPDATE REFUND AFTER WINNING
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

// JOB
const job = async () => {
	if (stopJob) return;
	let orders = await getAllPendingOrders();

	await db.update(users).set({
		isOnline: false,
	});
	console.log("All users are offline");

	try {
		console.log("Cron job started at", new Date().toISOString());
		await addPrizeWithRandomNumber();

		console.log("Orders: ", orders);

		orders.map((order: any) => {
			if (order.status === "Waiting for draw") {
				const update = async () => await updateOrderStatus(order);
				update();
				console.log("Update done");
			}
		});

		if (stopJob) return;
		await deleteExcessRecords();

		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

// START CRON JOB
export const startCronJob = async () => {
	await setUserOnline();

	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		return;
	}

	// Check the latest prize timestamp
	const latestPrize = await db
		.select()
		.from(prizes)
		.orderBy(desc(prizes.serial))
		.limit(1);
	const latestTimestamp = latestPrize
		? new Date(latestPrize[0].time).getTime()
		: 0;
	const currentTime = Date.now();

	console.log(currentTime - latestTimestamp < 120000);

	// If the latest prize was added in the last 2 minutes, do not start the cron job
	if (currentTime - latestTimestamp < 120000) {
		console.log("Cron job already ran recently, not starting again.");
		return;
	}

	isCronJobInitialized = true;
	stopJob = false;

	const interval = 60000;

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
		}, interval);
	}, getDelayToNextMinute());

	console.log("Cron job scheduled to start.");
};

// STOP CRON JOB
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
		currentJobPromise.finally(() => {
			console.log("Cron job stopped.");
		});
	} else {
		console.log("Cron job stopped.");
	}

	isCronJobInitialized = false;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (order: orderType) => {
	await updateSuccessOrder(order);
};
