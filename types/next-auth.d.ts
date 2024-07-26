import { DefaultSession } from "next-auth";

declare module "next-auth" {
	export interface Session {
		user: {
			admin: boolean;
		} & DefaultSession["user"];
	}
}
