![CI](https://github.com/openacme-io/website/actions/workflows/ci.yml/badge.svg)

# OpenAcme marketing site

Next.js (static export) marketing site for OpenAcme. Deployed to Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export → ./out
```

`npm run build` must pass before any change is handed off — it gates both local
review and the CI pipeline.

## Conventions

- Static export only (`output: "export"` in `next.config.ts`). No server runtime, no API routes, no ISR.
- Node pinned via `engines` in `package.json`; the lockfile is committed so CI and Vercel match local.
- Keep `.vercel/project.json` intact — the deployer relies on it.

## CI / CD

- **CI** (`.github/workflows/ci.yml`) — runs on every push and PR: install, typecheck, build, upload `out/` artifact.
- **Deploy** (`.github/workflows/deploy.yml`) — on push to the default branch, deploys to Vercel with `--prod`. Requires repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
