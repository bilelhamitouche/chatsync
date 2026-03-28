CREATE TYPE "public"."message_type" AS ENUM('Text', 'Image', 'Mixed');--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "type" "message_type";--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "image_url" text;