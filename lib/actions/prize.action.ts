"use server";
import db from "@/db/drizzle";
import { orderSuccess, prizes, users } from "@/db/schema";
import { orderType } from "@/types";
import { desc, eq } from "drizzle-orm";
import returnImg from "@/public/return.png";
import { getAllUsers, getSessionUser } from "./user.action";

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

// DEDUCT USER POINTS
export const deductUserPoints = async (
	id: any,
	deduct: number,
	addBalance: number
) => {
	try {
		await db
			.update(users)
			.set({
				points: deduct,
				balance: addBalance,
			})
			.where(eq(users.id, id));
		console.log("Deduct points successfull: ", deduct);
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
	cost: number,
	vipChoices: number[]
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
			vipChoices: vipChoices,
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
	let serial = null;
	if (latest?.serial) {
		serial = latest?.serial + 1;
	}

	try {
		await db
			.update(orderSuccess)
			.set({
				opening_time: new Date(),
				my_choice: choice,
				status: status,
				result_serial: serial,
			})
			.where(eq(orderSuccess.orderNo, orderNo));
		console.log("Update user order done");
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};

// UPDATE USER ORDER VIP
export const updateUserVipOrder = async (
	orderNo: any,
	status: string,
	choice: number[]
) => {
	const latest = await db.query.prizes.findFirst({
		orderBy: desc(prizes.time),
	});
	let serial = null;
	if (latest?.serial) {
		serial = latest?.serial + 1;
	}

	try {
		await db
			.update(orderSuccess)
			.set({
				opening_time: new Date(),
				vipChoices: choice,
				status: status,
				result_serial: serial,
			})
			.where(eq(orderSuccess.orderNo, orderNo));
		console.log("Update user order done");
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};

// UPDATE SUCCESS ORDERS
export const updateSuccessOrder = async (order: orderType) => {
	const returns = "Win the lottery";
	const status = "Sales success";
	const total = order.total * 2;
	const vip = order.games === "Guess 71x return";
	const vipTotal = order.cost === 1 ? 71 : 355;

	try {
		let latest = await db.query.prizes.findFirst({
			orderBy: desc(prizes.time),
		});

		if (vip) {
			if (latest && order?.vipChoices?.includes(latest.number)) {
				await db
					.update(orderSuccess)
					.set({
						image: returnImg.src,
						returns: returns,
						status: status,
						total: vipTotal,
						result_number: latest.number,
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
		} else {
			if (
				latest?.result_value === order.my_choice &&
				latest?.serial === order.result_serial
			) {
				await db
					.update(orderSuccess)
					.set({
						image: returnImg.src,
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
		}
	} catch (error) {
		console.error("Update User Order error: ", error);
	}
};

// GET RECENT WINNERS
export const getRecentWin = async () => {
	let users = await getAllUsers();

	let orders = await db
		.select()
		.from(orderSuccess)
		.orderBy(desc(orderSuccess.time))
		.where(eq(orderSuccess.status, "Sales success"))
		.limit(5);

	// Filter and map orders to get user-related information
	let result = orders.map((order) => {
		let user = users.find((user) => user.id === order.userId);
		return {
			name: user?.name || "participant",
			total: order.total,
		};
	});

	return result;
};

// SET USER ONLINE
export const setUserOnline = async () => {
	let userSession = await getSessionUser();

	console.log("User set online");

	if (userSession?.user.id) {
		await db
			.update(users)
			.set({
				isOnline: true,
			})
			.where(eq(users.id, userSession.user.id));

		console.log("User ", userSession.user.name, " is online");
	}
};

// GET ALL ONLINE USERS
export const getOnlineUsers = async () => {
	const userOnlines = await db.query.users.findMany({
		where: eq(users.isOnline, true),
		orderBy: desc(users.createdAt),
	});

	return userOnlines.length;
};
