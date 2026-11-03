# Google Calendar MCP Web App

Next.js frontend for Google Calendar MCP. It contains the public home page, Google account dashboard, MCP OAuth consent page, and user documentation. The backend API is a separate app in [`../server/`](../server/README.md).

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Project overview and copyable MCP endpoint. |
| `/dashboard` | Sign in with Google, connect or disconnect Calendar, manage MCP client access, and delete the account. |
| `/oauth/consent` | Review and approve or deny an MCP client's OAuth request. |
| `/docs` | Connection steps, current tool list, account security, and troubleshooting. |

## Local development

Requirements: Node.js 24, pnpm 12, and the API running locally at `http://localhost:5000`.

```bash
pnpm install
cp .env.example .env.local
```

Set the `NEXT_PUBLIC_*` values in `.env.local` to configure the API origin, public site URL, and author name/website. Values are validated with Zod in [`config/env.ts`](config/env.ts) and exposed to components and app config through [`config/index.ts`](config/index.ts). The NestJS API has its own validated config module because it is deployed separately. The example values are suitable for local development. Then start the frontend:

```bash
pnpm dev
```

The site runs at `http://localhost:3000` by default. Run backend setup from [`../server/README.md`](../server/README.md).

## Backend proxy

[`next.config.ts`](next.config.ts) rewrites `/api/*` and `/.well-known/*` to `NEXT_PUBLIC_BACKEND_URL`. The web app uses relative API paths, so browser requests go through the frontend origin while the Next.js server forwards them to the backend. For production deployments on separate domains, configure Google callbacks as the web app's proxied URLs (`/api/auth/callback` and `/api/auth/calendar/callback`) so the browser session cookie is set on the web origin.

For deployment, set `NEXT_PUBLIC_BACKEND_URL` to the public API origin, without a path such as `/api` or `/mcp`, and set `NEXT_PUBLIC_SITE_URL` to the public frontend origin. Set `NEXT_PUBLIC_SITE_AUTHOR_NAME` and `NEXT_PUBLIC_SITE_AUTHOR_URL` for SEO and the visible consent-page credit. Set the API's matching `SITE_AUTHOR_NAME` and `SITE_AUTHOR_URL`; those values appear in OAuth discovery metadata. Also set `WEB_ORIGIN` to the public frontend origin. Configure `GOOGLE_REDIRECT_URI` and `GOOGLE_CALENDAR_REDIRECT_URI` as the frontend callback URLs, then add those exact URLs to the Google OAuth client's authorized redirect URIs.

## Commands

```bash
pnpm dev       # Start local development
pnpm build     # Build for deployment
pnpm start     # Serve the production build
pnpm lint      # Run ESLint
pnpm typecheck # Type-check without emitting files
```

The app uses Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui components. The frontend does not contain Google OAuth secrets; OAuth and Calendar API calls are handled by the backend.
