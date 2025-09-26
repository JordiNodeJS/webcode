# (cookies) route group

This folder is a Next.js App Router "route group" used to colocate pages
related to privacy and cookies without changing their public URLs.

Why we use a route group

- Files inside a route group like `(cookies)` are not reflected in the
  generated URL. For example:
  - `src/app/(cookies)/privacy/page.tsx` -> served at `/privacy`
  - `src/app/(cookies)/politica-privacidad/page.tsx` -> served at `/politica-privacidad`
  - `src/app/(cookies)/cookies/page.tsx` -> served at `/cookies`

Benefits

- Keeps related pages colocated for easier maintenance and translations.
- Allows adding group-level route files (e.g., `route.ts`) later if needed.

Notes for contributors

- Do not change the folder name (keep parentheses) unless you intend to
  affect routing.
- If you add shared metadata for the group, prefer adding a `route.ts` or
  a `layout.tsx` inside this folder.
- Keep page-level `metadata` when pages require different robots or i18n
  settings.

Example: moving a page into the group

1. Create `src/app/(cookies)/your-page/page.tsx` with the same contents.
2. Remove the old file in `src/app/your-page` (the URL will remain the same).
