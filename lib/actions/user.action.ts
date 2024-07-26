"use server";

import { signIn, signOut } from "@/auth";
import { signInFormSchema } from "../validator";
import { isRedirectError } from "next/dist/client/components/redirect";

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
		return { successs: true, message: "Sign in successfully" };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: "Invalid email or password" };
	}
}

export const SignOut = async () => {
	await signOut();
};
