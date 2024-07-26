import * as z from "zod";

export const signInFormSchema = z.object({
	phone: z.string().min(10, "Phone must be at least 10 numbers"),
	password: z.string().min(3, "Password must be at least 3 characters"),
});
