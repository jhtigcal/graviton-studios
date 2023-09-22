import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  datetime,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const verificationTokens = mysqlTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }).primaryKey().notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: datetime('expires').notNull(),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
      verificationToken.token
    ),
  })
);

export type VerificationToken = InferSelectModel<typeof verificationTokens>;
export type InsertVerificationToken = InferInsertModel<
  typeof verificationTokens
>;
