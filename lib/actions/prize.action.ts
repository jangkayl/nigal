"use server";
import db from "@/db/drizzle";
import { orderSuccess, prizes, users } from "@/db/schema";
import { orderType } from "@/types";
import { randomInt } from "crypto";
import { asc, desc, eq, notInArray } from "drizzle-orm";
import { getSessionUser } from "./user.action";

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

// DEDUCT BALANCE
export const deductUserBalance = async (id: any, deduct: number) => {
	try {
		await db
			.update(users)
			.set({
				balance: deduct,
			})
			.where(eq(users.id, id));
		console.log("Deduct successfull: ", deduct);
	} catch (error) {
		console.error("Deduct error: ", error);
	}
};

// GENERATE ORDER
export const generateOrder = async (
	id: any,
	item: number,
	games: string,
	total: number,
	image: string,
	returns: string,
	cost: number
) => {
	try {
		await db.insert(orderSuccess).values({
			userId: id,
			item: item,
			games: games,
			total: total,
			image: image,
			returns: returns,
			cost: cost,
		});
		console.log("Generate order done");
	} catch (error) {
		console.error("Generate Order error: ", error);
	}
};

// GET LATEST ORDER BY USER ID
export const getLatestUserOrder = async (userId: any) => {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const result = await db.query.orderSuccess.findFirst({
			where: eq(orderSuccess.userId, userId),
			orderBy: desc(orderSuccess.time),
		});

		return result;
	} catch (error) {
		console.error("Query error:", error);
		throw error;
	}
};

// GET USER ORDER BY ID
export const getOrderById = async (orderNo: any) => {
	if (!orderNo) {
		throw new Error("orderNo is required");
	}

	try {
		const result = await db.query.orderSuccess.findFirst({
			where: eq(orderSuccess.orderNo, orderNo),
		});

		return result;
	} catch (error) {
		console.error("Query error:", error);
		throw error;
	}
};

// GET ALL USER ORDER
export const getAllUserOrder = async (id: any) => {
	try {
		const result = await db.query.orderSuccess.findMany({
			where: eq(orderSuccess.userId, id),
			orderBy: desc(orderSuccess.time),
		});

		return result;
	} catch (error) {
		console.error("Query error:", error);
		throw error;
	}
};

// UPDATE USER ORDER
export const updateUserOrder = async (
	orderNo: any,
	status: string,
	choice: number
) => {
	try {
		await db
			.update(orderSuccess)
			.set({
				opening_time: new Date(),
				my_choice: choice,
				status: status,
			})
			.where(eq(orderSuccess.orderNo, orderNo));
		console.log("Update user order done");
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};

export const updateSuccessOrder = async (order: orderType) => {
	let latestResult = await getPrizeResult();
	const image =
		"https://manage.im2015.com//uploads/attach/2020/05/20200515/0e8c80facdfc560b7e45e3281b20c13c.png";
	const returns = "Win the lottery";
	const status = "Sales success";
	const total = order.total * 2;

	console.log(latestResult);

	try {
		if (latestResult === order.my_choice) {
			await db
				.update(orderSuccess)
				.set({
					image: image,
					returns: returns,
					status: status,
					total: total,
				})
				.where(eq(orderSuccess.orderNo, order.orderNo));
		} else {
			await db
				.update(orderSuccess)
				.set({
					status: "Sales failed",
				})
				.where(eq(orderSuccess.orderNo, order.orderNo));
		}
		console.log("Update user order done");
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};

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
