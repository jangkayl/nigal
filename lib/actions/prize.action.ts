"use server";
import db from "@/db/drizzle";
import {
	orderSuccess,
	orderSuccessRelations,
	prizes,
	users,
	usersRelations,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";

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
	image: string
) => {
	try {
		await db.insert(orderSuccess).values({
			userId: id,
			item: item,
			games: games,
			total: total,
			image: image,
		});
		console.log("Generate order done");
	} catch (error) {
		console.error("Generate Order error: ", error);
	}
};

// GET USER ORDER BY ID
export const getOrderById = async (orderNo: any) => {
	if (!orderNo) {
		throw new Error("User ID is required");
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
