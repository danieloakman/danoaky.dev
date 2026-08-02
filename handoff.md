# Handoff: Resume two-page layout

## Context

Branch: `feat/2-page-resume` (clean working tree, tracking `origin/feat/2-page-resume`).

Plan: `~/.cursor/plans/Resume two-page layout-bd245676.plan.md`

Goal was a 2-page resume at `/resume` for Playwright PDF capture, while keeping the old 1-page layout in code but unreachable.

## Done

- Archived 1-pager: `src/routes/resume/one-page.svelte` (no `+` prefix → not routed)
- New 2-pager: `src/routes/resume/+page.svelte` — two stacked A4 sheets (`210mm × 297mm`, `overflow-hidden`)
- Dev-only gate unchanged: `src/routes/resume/+page.server.ts` (404 unless `dev`)
- `scripts/create-resume.ts` watches both `+page.svelte` and `one-page.svelte`
- Recent commits include `ed140b3 Initial design change` and `4c6b9a3 remove old pdf from resume.pdf`

### Current page split

**Page 1:** header, summary, contact, skills, experience excluding Auxilis full-time and UOW tutor  
(Future Secure AI → FrogCo → Tiny → Auxilis consultant)

**Page 2:** Auxilis full-time progression (Team Lead → Trainee), UOW tutor, selected projects, education, volunteering, interests, generated footer

Auxilis full-time was moved to page 2 after bullets were clipped by page 1’s fixed height + `overflow-hidden`.

## Likely next work

- Visual polish / rebalance if page 2 looks sparse or page 1 still clips after content edits
- Regenerate PDF: app running on `:5173`, then `bun create-resume` (or `-w`)
- PR / merge if ready
- Optional: tighten typography/spacing instead of further content moves if more experience is added later

## Key files

| Path | Role |
|------|------|
| `src/routes/resume/+page.svelte` | Live 2-page layout |
| `src/routes/resume/one-page.svelte` | Archived 1-page layout |
| `src/routes/resume/+page.server.ts` | Prod 404 gate |
| `src/lib/assets/content.ts` | Experience / skills / projects data |
| `scripts/create-resume.ts` | Playwright PDF → `static/resume.pdf` |
| `svelte.config.js` | `handleHttpError` swallows `/resume` prerender 404 |

## Suggested skills

- None required for layout tweaks; read the resume route files directly
- `changie` if this repo uses changelog entries before release
- PR creation flow (user rules / `gh`) when opening a pull request
