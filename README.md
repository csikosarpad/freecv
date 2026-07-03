# Free CV Editor

A modern CV editor web application built with React, TypeScript and Vite. Create, edit, and export your CV with drag-and-drop functionality, real-time persistence, and print-ready formatting.

## Features

✨ **Core Functionality**
- 📝 **Editable CV Sections** - Add, edit, and delete CV sections with drag-to-reorder
- 🎯 **Skills Management** - Add/edit/delete skills with progress sliders (0-100%)
- 👤 **Personal Info Editing** - Update header (name, title) and contact details (phone, email)
- 🔒 **Section Locking** - Lock sections to prevent accidental edits
- ♻️ **Drag-and-Drop** - Reorder sections and skills with visual feedback
- 💾 **Auto-Save** - Automatic persistence to browser localStorage (debounced 500ms)
- 🔄 **Reset** - Clear all data and start fresh with confirmation

📱 **Responsive Design**
- Mobile-first design with breakpoints: 480px, 768px, 1024px, 1440px+
- Optimized A4 page format (210mm × 297mm) for printing
- Adaptive layout for all device sizes

🖨️ **Print & Export**







































































































































































































































































































































































































































































- Print-ready view with clean styling
- PDF export via html2pdf.js library
- 2x scale for high-quality exports

🧪 **Development**
- Full TypeScript support with strict type safety
- Comprehensive unit tests (Vitest + React Testing Library)
- ESLint for code quality
- Clean CSS architecture without Tailwind (vanilla CSS)

## Tech Stack

- **React 18.2** - UI framework
- **TypeScript 5.2** - Type safety
# Free CV Editor

A modern CV editor built with React, TypeScript, and Vite. It supports inline editing, drag-and-drop reordering, local persistence, print/PDF export, undo/redo, dark mode, and bilingual UI labels.

## Features

### Core Editing
- Editable CV header, personal details, skills, and free-form sections
- Add, delete, duplicate, lock, and reorder content blocks
- Skill progress sliders with live visual feedback
- Undo/redo for recent CV changes

### Persistence & Preferences
- Debounced auto-save to `localStorage`
- Safe reset that clears only this app's stored CV data
- Persistent theme preference (`light` / `dark`)
- Persistent locale preference (`en` / `hu`)

### Print & Export
- Print-ready A4 layout
- PDF export via `html2pdf.js`
- Shared styling path for browser print and PDF export cleanup

### UX & Presentation
- Native drag-and-drop with explicit drop target feedback
- Responsive layout across mobile, tablet, laptop, and desktop widths
- Dark mode support
- English and Hungarian UI labels

### Development Quality
- TypeScript strict mode
- Vitest + React Testing Library tests
- ESLint with zero-warning policy
- Vanilla CSS with nested rules

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- pnpm 10
- Vitest
- React Testing Library
- html2pdf.js
- Vanilla CSS

## Getting Started

```bash
pnpm install
pnpm dev
```

Open the local Vite URL printed in the terminal, typically `http://localhost:5173` or `http://localhost:5174`.

## Scripts

- `pnpm dev` - start the development server
- `pnpm build` - run type-check and production build
- `pnpm preview` - preview the production build locally
- `pnpm lint` - run ESLint with `--max-warnings 0`
- `pnpm test` - run tests once
- `pnpm test:watch` - run tests in watch mode
- `pnpm test:coverage` - run tests with coverage reporting

## Testing

The project uses Vitest with jsdom and React Testing Library.

- Test setup: `src/test/setup.ts`
- Test files: `src/**/*.test.tsx`
- Coverage target: 60%

Run tests with:

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

## Project Structure

```text
src/
├── components/
│   ├── CVEditor.tsx
│   ├── CVEditor.test.tsx
│   ├── EditorHeader.tsx
│   ├── PersonalSection.tsx
│   ├── SectionCard.tsx
│   ├── SectionDeleteDialog.tsx
│   ├── SectionsPanel.tsx
│   ├── SideBar.test.tsx
│   ├── SideBar.tsx
│   ├── SidePanel.tsx
│   └── SkillsSection.tsx
├── hooks/
│   ├── useHistoryState.ts
│   └── useLocalStorage.ts
├── test/
│   └── setup.ts
├── App.css
├── App.test.tsx
├── App.tsx
├── i18n-context.ts
├── i18n-data.ts
├── i18n.tsx
├── index.css
├── main.tsx
└── print.css
```

## Architecture

### State Model
- `App.tsx` owns the CV document state and app-level preferences
- `useLocalStorage` persists CV data, theme, and locale
- `useHistoryState` wraps the CV document with undo/redo history

### Component Hierarchy

```text
App
├── SideBar
│   ├── history controls
│   ├── theme toggle
│   ├── locale selector
│   └── export/reset actions
└── CVEditor
    ├── EditorHeader
    ├── SidePanel
    │   ├── PersonalSection
    │   └── SkillsSection
    └── SectionsPanel
        ├── SectionCard
        └── SectionDeleteDialog
```

### Styling
- `index.css` contains the main layout, drag/drop, responsive, and theme styling
- `App.css` contains sidebar actions, autosave indicator, and modal styling
- `print.css` contains print/PDF cleanup rules

## Key Behaviors

### Undo / Redo
- Recent edits are tracked in local history
- Rapid typing is grouped into a single undo step
- History controls are available from the sidebar

### Theme & Locale
- Light and dark mode are user-selectable
- UI labels are available in English and Hungarian
- Both settings are restored on reload

### Drag-and-Drop
- Sections and skills use native drag/drop
- Dragged items and drop targets have distinct visual states

### Print / PDF Export
- Print uses the browser print dialog
- PDF export uses `html2pdf.js` with A4 sizing and export-specific cleanup

## Browser Support

- Chrome / Edge
- Firefox
- Safari
- Mobile browsers with modern CSS and drag/drop support

## License

MIT