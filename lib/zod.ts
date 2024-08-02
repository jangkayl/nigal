import * as z from "zod";

export const signInFormSchema = z.object({
	phone: z.string().min(10, "Phone must be at least 10 numbers"),
	password: z.string().min(3, "Password must be at least 3 characters"),
});

export const signUpFormSchema = z
	.object({
		phone: z
			.string()
			.min(10, "Phone must be at least 10 digits")
			.max(10, "Phone max is 10 digits"),
		password: z.string().min(3, "Password must be at least 3 characters"),
		confirmPassword: z
			.string()
			.min(3, "Password must be at least 3 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
