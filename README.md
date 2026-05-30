# DevSnippet AI

Mobile application for creating, managing, exporting, and explaining code snippets using React Native + Expo.

## Screenshots

Add your latest app screenshots here:

![Home Screen](./assets/)
![App Icon](./assets)

## Tech Stack

- Expo SDK 55
- React Native
- Expo Router
- SQLite (`expo-sqlite`)
- Expo File System (`expo-file-system`)
- OpenAI Responses API

## Project Structure

```text
src/
  app/
    (tabs)/
      home/
      files.tsx
      favorites.tsx
      settings.tsx
  components/
    common/
    files/
    home/
    settings/
  context/
  constants/
  lib/
    snippets-db.ts
    local-files.ts
  types/
```

## SQLite Structure

The app stores snippet records in a local SQLite database (`dev-snippets.db`) with table `snippets`.

### Table: `snippets`

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key |
| `title` | TEXT | Snippet title |
| `code` | TEXT | Snippet code content |
| `language` | TEXT | Language label |
| `tags` | TEXT | JSON string array |
| `is_favorite` | INTEGER | 0/1 boolean flag |
| `created_at` | TEXT | ISO datetime |
| `updated_at` | TEXT | ISO datetime |

### Data Access Layer

Implemented in [`src/lib/snippets-db.ts`](./src/lib/snippets-db.ts):

- `initSnippetDb()`
- `createSnippet()`
- `updateSnippet()`
- `deleteSnippet()`
- `getSnippetById()`
- `getAllSnippets()`
- `searchSnippets()`
- `getFavoriteSnippets()`
- `setSnippetFavorite()`

## Database Structure (Flow)

1. App starts and initializes SQLite database.
2. Snippets are saved/updated through `snippets-db.ts`.
3. Home/Favorites tabs query SQLite directly.
4. Files tab can export snippet code into local files for offline use/sharing.

## Offline Storage Approach

This project uses a hybrid local-first strategy:

- **Structured data** (snippets metadata + code) in SQLite.
- **Binary/export files** in app document storage via Expo File System.
- **API key** securely stored with `expo-secure-store`.

Benefits:

- Works offline for core snippet CRUD.
- Fast local reads/writes.
- Clear split between relational data and file assets.

## File Management Implementation

Implemented in [`src/lib/local-files.ts`](./src/lib/local-files.ts) and Files tab [`src/app/(tabs)/files.tsx`](./src/app/(tabs)/files.tsx).

### Local directories

- `Paths.document/snippet-files/`
- `snippet-files/screenshots/`
- `snippet-files/code/`
- `snippet-files/downloads/`

### Features

- Attach screenshots (picker-based flow)
- Save snippets as local code files (`.ts`, `.js`, `.py`, etc.)
- Download templates/resources into `downloads`
- Browse files by category (`ALL FILES`, `IMAGES`, `DOCS`, `CODE`, `AUDIO`)
- Share/open/delete stored files

## AI Integration Workflow

AI explanation is triggered from snippet details screen.

1. User opens a snippet and taps **Generate Explanation**.
2. App reads API key from secure storage.
3. App builds a prompt containing title, language, and code.
4. App calls `POST https://api.openai.com/v1/responses`.
5. Model output is rendered in the snippet details view.

Current integration file:

- [`src/app/(tabs)/home/snippet-details.tsx`](./src/app/(tabs)/home/snippet-details.tsx)

## Getting Started

```bash
npm install
npm run start
```

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run lint
```
