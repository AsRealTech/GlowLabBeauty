CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"ingredients" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"benefits" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
