# OC Archive

Local prototype for multi-user OC character management with Worlds, Characters, Relationship Maps, Family Trees, Uploaded Maps, and an admin-only dashboard.

## Open Directly

Open this file in a browser:

```txt
/Users/danielzhang/Documents/Codex/2026-04-25/files-mentioned-by-the-user-stitch/index.html
```

The app now runs directly from `file://` without requiring package installation.

## Optional Dev Run

```sh
npm install
npm run dev
```

Then open the local Vite URL printed in the terminal. This is optional.

## Demo Accounts

- Normal creator session is seeded as `Nova`.
- Admin login is available at the Admin button or `#/admin-login`.
- Default admin credentials:
  - username: `admin`
  - password: `hos5555`

Changing the admin password persists in browser storage.

## Persistence

All data is stored locally in `localStorage` under:

```txt
oc-archive-local-prototype-v5
```

The Admin Dashboard includes a local demo reset button.

## Supabase

The Settings page includes a Supabase connection panel. The publishable key is prefilled, and the project URL can be added there, then tested with the connection button.
