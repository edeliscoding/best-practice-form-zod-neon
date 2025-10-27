CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"gender" varchar(50),
	"interests" text,
	"dob" date,
	"tags" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
