import { mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
