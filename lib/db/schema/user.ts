import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('email_verified'),
    image: varchar('image', { length: 255 }),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email),
  })
);

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
