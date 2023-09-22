import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  datetime,
  index,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const sessions = mysqlTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    sessionToken: varchar('session_token', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    expires: datetime('expires').notNull(),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex('sessions__session_token__idx').on(
      session.sessionToken
    ),
    userIdIndex: index('sessions__user_id__idx').on(session.userId),
  })
);

export type Session = InferSelectModel<typeof sessions>;
export type InsertSession = InferInsertModel<typeof sessions>;
