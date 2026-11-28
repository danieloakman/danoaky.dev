# [danoaky.dev](https://www.danoaky.dev)

Portfolio website and resume creation.

## Developing

1. Install bun
2. Install dependencies

```bash
bun i
```

3. Run the development server

```bash
bun dev
```

## Building

To create a production version of your app:

```bash
bun build
```

You can preview the production build with `bun preview`.

## Deploying

Merging to main will trigger a deployment to Cloudflare Workers which pushes the latest changes in main to [danoaky.dev](https://danoaky.dev).

## Generating Resume

Two versions are produced, following career coach feedback:

- **ai** (default) leads with production AI work. Written to `static/resume.{pdf,docx}`.
- **app** leads with web and mobile app work. Written to `static/resume-app.{pdf,docx}`.

- **PDF** — Playwright captures the `/resume` route (dev-only; not available in production). Requires the dev server. Pick a version with `/resume?variant=ai` or `/resume?variant=app`.
- **Word** — Built from the same TypeScript content via the `docx` package. No dev server needed.
- Copy lives in `src/lib/assets/resume-content.ts`. Search for `TODO(daniel)` to find facts still missing.

```bash
# PDF + Word for both versions. Start `bun dev` first for the PDF.
bun create-resume

# One version only
bun create-resume -v app

# Word only (no Playwright / no dev server)
bun create-resume -f docx

# PDF only, watch for changes
bun create-resume -f pdf -w
```

Omit `-w` for a one-shot run. Dated copies are also written to `$TMPDIR` as `DJB_Resume_YYYY-MM-DD.{pdf,docx}`.

## Inspiration

Inspired by the style of [Brittany Chiang's portfolio website](https://brittanychiang.com).
