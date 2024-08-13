"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { auth, signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "@/lib/zod";
import db from "@/db/drizzle";
import { userCredits, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "../utils";
import { userType } from "@/types";
import { revalidatePath } from "next/cache";

// SIGN UP USER
export async function signUp(prevState: unknown, formData: FormData) {
	try {
		const user = signUpFormSchema.parse({
			phone: formData.get("phone"),
			confirmPassword: formData.get("confirmPassword"),
			password: formData.get("password"),
		});
		const values = {
			name: crypto.randomUUID().slice(0, 8),
			id: crypto.randomUUID(),
			uid: crypto.randomUUID().slice(0, 8),
			...user,
			password: hashSync(user.password, 10),
		};
		const exists = await db.query.users.findFirst({
			where: eq(users.phone, user.phone),
		});
		if (exists) return { success: false, message: "Phone is already exist" };
		await db.insert(users).values(values);

		return { success: true, message: "User created successfully" };
	} catch (error) {
		return {
			success: false,
			message: formatError(error),
		};
	}
}

// SIGN IN USER
export async function signInWithCredentials(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = signInFormSchema.parse({
			phone: formData.get("phone"),
			password: formData.get("password"),
		});
		await signIn("credentials", user);
		return { success: true, message: "Sign in successfully" };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: "Invalid phone or password" };
	}
}

// SIGN OUT
export const SignOut = async () => {
	await signOut();
};

// GET USER BY ID
export const getUserById = async (id: string): Promise<userType | null> => {
	const user = await db.query.users.findFirst({
		where: eq(users.id, id),
	});

	return {
		id: user?.id || "",
		uid: user?.uid || "",
		name: user?.name || "",
		phone: user?.phone || "",
		admin: user?.admin ?? false,
		image: user?.image || "",
		balance: user?.balance ?? 0,
		points: user?.points ?? 0,
		createdAt: user?.createdAt || new Date(),
		isOnline: user?.isOnline || false,
	};
};

// CHANGE PROFILE BY ID
export const changeProfileById = async (id: string, image: string) => {
	await db
		.update(users)
		.set({
			image: image,
		})
		.where(eq(users.id, id));

	revalidatePath("/");
};

// CHANGE NAME BY ID
export const changeNameById = async (id: string, name: string) => {
	await db
		.update(users)
		.set({
			name: name,
		})
		.where(eq(users.id, id));

	revalidatePath("/");
};

// GET USER SESSION
export const getSessionUser = async () => {
	const session = await auth();
	return session;
};

// GET ALL USERS
export const getAllUsers = async () => {
	let players = await db.query.users.findMany({
		orderBy: desc(users.createdAt),
	});

	let result = players.map((players: any) => ({
		name: players.name,
		id: players.id,
	}));

	return result;
};

// WITHDRAWAL SUCCESS
export const successWithdrawal = async (id: string, balance: number) => {
	await db
		.update(users)
		.set({
			balance: balance,
		})
		.where(eq(users.id, id));
};

// ADD CREDITS TO USER
export const addUserCredit = async (id: string, balance: number) => {
	await db
		.update(users)
		.set({
			balance: balance,
		})
		.where(eq(users.id, id));
};

// GENERATE USER ADD CREDITS
export const generateAddCredit = async (
	userId: string,
	amount: number,
	bonus: number
) => {
	await db.insert(userCredits).values({
		userId,
		amount,
		bonus,
		createdAt: new Date(),
		status: false,
	});

	const result = await db.query.userCredits.findFirst({
		where: eq(userCredits.userId, userId),
		orderBy: desc(userCredits.createdAt),
	});

	return result?.orderNum;
};

// UPDATE ADD CREDIT
export const updateAddCredit = async (userId: string, orderNo: string) => {
	if (userId) {
		await db
			.update(userCredits)
			.set({
				status: true,
			})
			.where(eq(userCredits.orderNum, orderNo));
	}
};

// GET ALL ADD CREDIT BY ID
export const getCreditById = async (userId: string) => {
	const result = await db.query.userCredits.findMany({
		where: eq(userCredits.userId, userId),
		orderBy: desc(userCredits.createdAt),
	});

	return result;
};
