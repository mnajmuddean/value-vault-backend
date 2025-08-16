CREATE TABLE "items" (
	"item_code" serial PRIMARY KEY NOT NULL,
	"item" text NOT NULL,
	"unit" text NOT NULL,
	"item_group" text NOT NULL,
	"item_category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items_premises" (
	"date" date NOT NULL,
	"premise_code" integer NOT NULL,
	"item_code" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	CONSTRAINT "items_premises_date_premise_code_item_code_pk" PRIMARY KEY("date","premise_code","item_code")
);
--> statement-breakpoint
CREATE TABLE "premises" (
	"premise_code" serial PRIMARY KEY NOT NULL,
	"premise" text NOT NULL,
	"address" text NOT NULL,
	"premise_type" text NOT NULL,
	"state" text NOT NULL,
	"district" text NOT NULL
);
