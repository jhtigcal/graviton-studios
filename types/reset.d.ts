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

  SMTP_SERVER: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  EMAIL_FROM: z.string().email(),
});

envSchema.parse(process.env);

declare global {
  export namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
