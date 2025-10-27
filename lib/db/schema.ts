import { pgTable, serial, varchar, text, boolean, timestamp, date } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 50 }),
  interests: text("interests"),
  dob: date("dob"),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
