"use server";
import db from "@/db/drizzle";
import { prizes } from "@/db/schema";
import { desc } from "drizzle-orm";

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
