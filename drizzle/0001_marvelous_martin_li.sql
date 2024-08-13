CREATE TABLE IF NOT EXISTS "userCredits" (
	"userId" uuid NOT NULL,
	"orderNum" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"amount" integer NOT NULL,
	"status" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userCredits" ADD CONSTRAINT "userCredits_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
