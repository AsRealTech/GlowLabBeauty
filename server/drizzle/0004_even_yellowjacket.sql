ALTER TABLE "ingredients"
ALTER COLUMN "benefits"
SET DATA TYPE text[]
USING ARRAY[benefits];

--> statement-breakpoint

ALTER TABLE "ingredients"
ALTER COLUMN "benefits"
SET DEFAULT '{}';
