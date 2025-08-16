CREATE TABLE "secret_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"portal_id" uuid NOT NULL,
	"secret" text NOT NULL
);
