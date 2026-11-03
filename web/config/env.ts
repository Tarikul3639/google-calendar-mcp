import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url().default("http://localhost:5000"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_AUTHOR_NAME: z
    .string()
    .trim()
    .min(1)
    .default("Tarikul Islam"),
  NEXT_PUBLIC_SITE_AUTHOR_URL: z
    .string()
    .url()
    .default("https://tarikul-islam.me"),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_AUTHOR_NAME: process.env.NEXT_PUBLIC_SITE_AUTHOR_NAME,
  NEXT_PUBLIC_SITE_AUTHOR_URL: process.env.NEXT_PUBLIC_SITE_AUTHOR_URL,
})
