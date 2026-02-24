ALTER TABLE "products" ADD COLUMN "imageUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "imageUrls" text[] NOT NULL;