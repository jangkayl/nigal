CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cronStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"isInitialized" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderSuccess" (
	"orderNo" uuid PRIMARY KEY NOT NULL,
	"item" integer NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'Is not on sales yet' NOT NULL,
	"returns" text,
	"games" text,
	"isDone" boolean DEFAULT false,
	"opening_time" timestamp,
	"my_choice" integer,
	"result_number" integer,
	"result_serial" integer,
	"image" text,
	"cost" integer,
	"total" integer NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prizes" (
	"serial" bigserial PRIMARY KEY NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL,
	"number" integer NOT NULL,
	"result_value" integer NOT NULL,
	"result" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uid" text NOT NULL,
	"name" text,
	"phone" text NOT NULL,
	"admin" boolean DEFAULT false,
	"password" text,
	"image" text DEFAULT 'https://www.im2015.com/user-avatar/n1.png',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"balance" double precision DEFAULT 300,
	"points" double precision DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderSuccess" ADD CONSTRAINT "orderSuccess_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
