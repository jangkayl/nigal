"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { auth, signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "@/lib/zod";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "../utils";
import { userType } from "@/types";
import { revalidatePath } from "next/cache";

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

export const SignOut = async () => {
	await signOut();
};

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
	};
};

export const changeProfileById = async (id: string, image: string) => {
	await db
		.update(users)
		.set({
			image: image,
		})
		.where(eq(users.id, id));

	revalidatePath("/");
};

export const changeNameById = async (id: string, name: string) => {
	await db
		.update(users)
		.set({
			name: name,
		})
		.where(eq(users.id, id));

	revalidatePath("/");
};

export const getSessionUser = async () => {
	const session = await auth();
	return session;
};
