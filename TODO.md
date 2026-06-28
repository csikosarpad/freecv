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

## 3) Responsive Design & Print Optimization

- [x] Implement responsive design using CSS media queries.
- [x] Optimize `cv-frame` class element for A4 page size (210mm x 297mm).
- [x] Add print view functionality with proper styling for printing.
- [x] Add PDF export capability (using html2pdf.js library).
- [x] Ensure all breakpoints work on mobile, tablet, and desktop views.

## 4) Drag-and-Drop & Interaction Improvements

- [x] Add visual "grab handle" area for drag-and-drop blocks to make them more intuitive.
- [x] Improve drag-and-drop feedback with better visual cues (cursor changes, highlighting).
- [x] Implement block locking mechanism with "lock" icon to prevent accidental edits.
- [x] Allow drag-and-drop functionality to work even on locked blocks.
- [x] Add visual distinction between locked and unlocked states.

## 5) Skills Section Enhancement

- [x] Make Skills list editable with on-the-fly add/delete functionality.
- [x] Add ability to set skill progress values using a slider component.
- [x] Validate skill entries (name, progress value range 0-100).
- [x] Improve UI/UX for skill management (drag-to-reorder, quick actions).

## 6) Header Section Editability

- [x] Make header section (currently non-editable) fully editable.
- [x] Add edit mode toggle for header information (name, contact details, summary).
- [x] Support inline editing for header fields.

## 7) State Persistence with LocalStorage

- [x] Implement LocalStorage integration to persist all CV data within `cv-frame`.
- [x] Auto-save changes as users edit (debounced updates).
- [x] Add "Save" indicator/feedback in the UI.
- [x] Add "Reset" button to clear saved data and start fresh.
- [x] Ensure data persists across browser sessions.

## 8) Sections Management

- [x] Add "Add Section" button to create new sections dynamically.
- [x] Implement delete functionality for sections with confirmation dialog.
- [x] Ensure new sections are properly initialized with default values.
- [x] Persist section additions/deletions to localStorage.
- [x] Add visual feedback for section creation and deletion actions.

## 9) Execution order

1. Package manager migration to pnpm.
2. Testing stack setup and baseline tests.
3. LocalStorage implementation and state management refactor.
4. Header section editability.
5. Skills section enhancement.
6. Drag-and-drop and interaction improvements.
7. Responsive design and print optimization.
8. Sections management (add/delete).