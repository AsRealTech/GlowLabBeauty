ALTER TABLE "ingredients" ALTER COLUMN "benefits" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "ingredients" ALTER COLUMN "benefits" SET DEFAULT '{}';