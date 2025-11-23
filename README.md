# ArtPreviewer

This template should help get you started developing with Vue 3 in Vite.

**Note:** This is a demonstration project built for **OUTFIT 7** showcasing modern frontend architecture patterns and best practices.
This project was firstly designed using figma [link](https://www.figma.com/design/oDbmUewxuhlxOMh8lYctsH/ArtPreviewer?node-id=0-1&t=8Qbf6EciQVuK1GM1-1)

---

## Project Overview

This application provides a clean interface for managing game assets with features including:

- Asset browsing with grid or list layout
- Filtering (search, format, game tags)
- Multi-select bulk downloads (packaged as ZIP) or single asset downloads
- Download history tracking with localStorage persistence (just for the demo)
- Dark mode UI with HSL color theming
- Responsive design optimized for desktop

---

## Data Storage

**Important:** This demo uses **localStorage** to persist download history. In a production environment, this would be replaced with a proper backend database.

## Mock Data

For demonstration purposes:

- **2 actual images** located in `src/api/assets/`
- **10 mock asset entries** with varied metadata
- **7 game tags**
- **4 file formats** (PNG, JPG, SVG, WebP)

All asset references point to the same 2 images to keep the demo lightweight.
Later on the mock could be improved to easily tests layout with big chunks of data.

---

## TODO-s

- asset pagination (load assets and history with pagination, on scroll fetch more data)
- implement JTW + login
- RBAC
- token refresh mechanism
- secure storage
- clarify asset structure
- expand e2e tests as for the demo i did not write any in depth (this should be later on implemented as each component should potentialy have at least some unit tests)
- set up CI/CD pipeline
- integration tests

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
