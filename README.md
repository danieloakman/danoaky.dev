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

The [resume.pdf](./static/resume.pdf) file is captured/generated using Playwright. Playwright looks at the _/resume_ route, which can't be accessed in production.

```bash
bun dev &
sleep 5
bun create-resume -w
```

## Inspiration

Inspired by the style of [Brittany Chiang's portfolio website](https://brittanychiang.com).
