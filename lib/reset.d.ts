import '@total-typescript/ts-reset';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),

  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_ACCESS_TOKEN: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_ACCESS_TOKEN: z.string(),

  SMTP_FROM: z.string().email(),
  POSTMARK_API_TOKEN: z.string(),
  POSTMARK_SIGN_IN_TEMPLATE: z.string(),
  POSTMARK_ACTIVATION_TEMPLATE: z.string(),
});

envSchema.parse(process.env);

declare global {
  export namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
