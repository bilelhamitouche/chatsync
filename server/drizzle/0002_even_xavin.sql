ALTER TABLE "chat_members" ALTER COLUMN "is_admin" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "image" text;