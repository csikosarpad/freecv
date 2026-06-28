# Project TODO

## 1) Package manager modernization

- [x] Migrate from npm to pnpm.
- [x] Add `packageManager` field to package metadata after migration.
- [x] Remove `package-lock.json` and generate `pnpm-lock.yaml`.
- [x] Update README setup commands (`pnpm install`, `pnpm dev`, `pnpm test`).

Why pnpm:
- Faster and more storage-efficient installs via content-addressable store.
- Stricter dependency resolution helps catch hidden dependency issues early.
- Great monorepo support if the project grows later.

## 2) Add unit testing

- [x] Add Vitest + React Testing Library + jsdom.
- [x] Create `src/test/setup.ts` for test environment initialization.
- [x] Add test scripts (`test`, `test:watch`, `test:coverage`).
- [x] Add first tests for `SideBar` and static render checks in `CVEditor`.
- [x] Add one behavior test for drag/drop section movement (state-based implementation).
- [x] Add coverage threshold (initial target: 60%).

## 3) Execution order

1. Package manager migration to pnpm.
2. Testing stack setup and baseline tests.
3. Continue with the broader refactor and quality improvements.