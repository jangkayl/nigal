import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
	boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// USERS
export const users = pgTable("user", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	phone: text("phone").notNull(),
	phoneVerified: timestamp("phoneVerified", { mode: "date" }),
	admin: boolean("admin").default(false),
	password: text("password"),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: uuid("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: uuid("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	})
);
