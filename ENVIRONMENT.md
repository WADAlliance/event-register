Environment variables
=====================

Create a `.env.local` file in the project root (this file is ignored by git).

Add the following variables for Airtable:

- `AIRTABLE_BASE_ID` — your Airtable Base ID (starts with `app...`).
- `AIRTABLE_API_KEY` — your Airtable API key or personal access token.

The project reads these variables from `src/lib/airtable.ts` at runtime.
