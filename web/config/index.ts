import { env } from "./env"

export const config = {
  site: {
    name: "Google Calendar MCP",
    description:
      "Connect ChatGPT and other MCP clients to Google Calendar with a hosted MCP server using Google OAuth and per-user access.",
    url: env.NEXT_PUBLIC_SITE_URL,
    author: {
      name: env.NEXT_PUBLIC_SITE_AUTHOR_NAME,
      url: env.NEXT_PUBLIC_SITE_AUTHOR_URL,
    },
  },
  backend: {
    url: env.NEXT_PUBLIC_BACKEND_URL,
  },
  mcp: {
    endpoint: `${env.NEXT_PUBLIC_BACKEND_URL}/mcp`,
  },
} as const
