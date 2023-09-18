import { sql } from 'drizzle-orm';
import {
  datetime,
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
