import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { NextAuthOptions } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';

// import { sendVerificationRequest } from './helpers/send-verification-request';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // sendVerificationRequest,
    }),
  ],
};
