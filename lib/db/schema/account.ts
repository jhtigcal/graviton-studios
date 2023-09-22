import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const accounts = mysqlTable(
  'accounts',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    access_token: text('access_token'),
    expires_in: int('expires_in'),
    id_token: text('id_token'),
    refresh_token: text('refresh_token'),
    refresh_token_expires_in: int('refresh_token_expires_in'),
    scope: varchar('scope', { length: 255 }),
    token_type: varchar('token_type', { length: 255 }),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      'accounts__provider__provider_account_id__idx'
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index('accounts__user_id__idx').on(account.userId),
  })
);

export type Account = InferSelectModel<typeof accounts>;
export type InsertAccount = InferInsertModel<typeof accounts>;
