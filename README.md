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

Resume artifacts are written to [`static/resume.pdf`](./static/resume.pdf) and [`static/resume.docx`](./static/resume.docx).

- **PDF** — Playwright captures the `/resume` route (dev-only; not available in production). Requires the dev server.
- **Word** — Built from the same TypeScript content via the `docx` package. No dev server needed.

```bash
# PDF + Word (default). Start `bun dev` first for the PDF.
bun create-resume

# Word only (no Playwright / no dev server)
bun create-resume -f docx

# PDF only, watch for changes
bun create-resume -f pdf -w
```

Omit `-w` for a one-shot run. Dated copies are also written to `$TMPDIR` as `DJB_Resume_YYYY-MM-DD.{pdf,docx}`.

## Inspiration

Inspired by the style of [Brittany Chiang's portfolio website](https://brittanychiang.com).
