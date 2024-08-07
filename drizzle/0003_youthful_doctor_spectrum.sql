CREATE TABLE IF NOT EXISTS "cronStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"isInitialized" boolean DEFAULT false NOT NULL
);
