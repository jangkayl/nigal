import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";

loadEnvConfig(cwd());

const main = async () => {
	try {
		const client = new Client({
			connectionString: process.env.NEON_DATABASE_URL,
		});
		await client.connect();
		const db = drizzle(client);

		await db.delete(schema.accounts);
		await db.delete(schema.users);

		await client.end();
	} catch (error) {
		console.error(error);
		throw new Error("Failed to seed database");
	}
};

main();
