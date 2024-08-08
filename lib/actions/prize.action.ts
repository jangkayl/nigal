"use server";
import db from "@/db/drizzle";
import { orderSuccess, prizes, users } from "@/db/schema";
import { orderType } from "@/types";
import { randomInt } from "crypto";
import { asc, desc, eq, notInArray } from "drizzle-orm";
import { getSessionUser } from "./user.action";
import { getPrizeResult } from "./prizeAuto.action";

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

// GET ALL ORDERS
export const getAllPendingOrders = async () => {
	try {
		const result = await db.query.orderSuccess.findMany({
			where: eq(orderSuccess.status, "Waiting for draw"),
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
	const latest = await db.query.prizes.findFirst({
		orderBy: desc(prizes.time),
	});

	try {
		await db
			.update(orderSuccess)
			.set({
				opening_time: new Date(),
				my_choice: choice,
				status: status,
				result_serial: latest?.serial,
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
		let latest = await db.query.prizes.findFirst({
			orderBy: desc(prizes.time),
		});
		if (latestResult === order.my_choice) {
			await db
				.update(orderSuccess)
				.set({
					image: image,
					returns: returns,
					status: status,
					total: total,
					result_number: latest?.number,
				})
				.where(eq(orderSuccess.orderNo, order.orderNo));
		} else {
			await db
				.update(orderSuccess)
				.set({
					status: "Sales failed",
					result_number: latest?.number,
				})
				.where(eq(orderSuccess.orderNo, order.orderNo));
		}
		console.log("Update user order done");
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};
