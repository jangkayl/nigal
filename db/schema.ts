import { relations } from "drizzle-orm";
import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
	boolean,
	doublePrecision,
	bigserial,
	serial,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

// USERS
export const users = pgTable("user", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	uid: text("uid").notNull(),
	name: text("name"),
	phone: text("phone").notNull(),
	admin: boolean("admin").default(false),
	password: text("password"),
	image: text("image").default("https://www.im2015.com/user-avatar/n1.png"),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
	balance: doublePrecision("balance").default(300.0),
	points: doublePrecision("points").default(0.0),
});

// PRIZES
export const prizes = pgTable("prizes", {
	serial: bigserial("serial", { mode: "number" }).primaryKey(),
	time: timestamp("time", { mode: "date" }).notNull().defaultNow(),
	number: integer("number").notNull(),
	result_value: integer("result_value").notNull(),
	result: text("result").notNull(),
});

// CRON STATUS
export const cronStatus = pgTable("cronStatus", {
	id: serial("id").primaryKey(),
	isInitialized: boolean("isInitialized").notNull().default(false),
});

// ORDER SUCCESS
export const orderSuccess = pgTable("orderSuccess", {
	orderNo: uuid("orderNo")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	item: integer("item").notNull(),
	time: timestamp("time", { mode: "date" }).notNull().defaultNow(),
	status: text("status").default("Is not on sales yet").notNull(),
	returns: text("returns"),
	games: text("games"),
	isDone: boolean("isDone").default(false),
	opening_time: timestamp("opening_time", { mode: "date" }),
	my_choice: integer("my_choice"),
	result_number: integer("result_number"),
	result_serial: integer("result_serial"),
	image: text("image"),
	cost: integer("cost"),
	total: integer("total").notNull(),
	userId: uuid("userId")
		.notNull()
		.references(() => users.id),
});

// RELATIONS
export const usersRelations = relations(users, ({ many }) => ({
	orderSuccess: many(orderSuccess),
}));

export const orderSuccessRelations = relations(orderSuccess, ({ one }) => ({
	user: one(users, {
		fields: [orderSuccess.userId],
		references: [users.id],
	}),
}));

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
