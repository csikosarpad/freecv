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
- **Vite 5.1** - Build tool & dev server
- **pnpm 10.34** - Fast, efficient package manager
- **Vitest + React Testing Library** - Testing framework
- **html2pdf.js 0.14** - PDF export
- **Vanilla CSS** - No utility frameworks, custom media queries

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` - start development server (http://localhost:5174)
- `pnpm build` - type-check and create production build
- `pnpm preview` - preview the production build locally
- `pnpm lint` - run ESLint with strict 0 warnings policy
- `pnpm test` - run tests once
- `pnpm test:watch` - run tests in watch mode
- `pnpm test:coverage` - run tests with coverage report (60% target)

## Testing

The project uses **Vitest** with jsdom and **React Testing Library** for comprehensive testing.

- Test setup file: `src/test/setup.ts`
- Test files: `src/components/*.test.tsx`
- Coverage target: 60%
- All tests must pass before commit

Run tests:
```bash
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage report
```

## Project Structure

```
src/
├── components/
│   ├── CVEditor.tsx           # Main editor with header management
│   ├── CVEditor.test.tsx       # Editor component tests
│   ├── SidePanel.tsx           # Personal info + skills panel
│   ├── SectionsPanel.tsx       # CV sections management
│   ├── SideBar.tsx             # Print, PDF export, reset buttons
│   └── SideBar.test.tsx        # Sidebar component tests
├── hooks/
│   └── useLocalStorage.ts      # Custom hook for persistent state with debouncing
├── App.tsx                     # Root component with state management
├── App.css                     # App-level styles (buttons, modals, sidebar)
├── index.css                   # Main stylesheet (A4 frame, responsive design, drag-drop)
├── print.css                   # Print-specific styles (hidden UI, clean printing)
├── main.tsx                    # React entry point
└── test/
    └── setup.ts                # Vitest + jsdom setup
```

## Code Quality Standards

✅ **No !important flags** - All styles use proper CSS specificity hierarchy  
✅ **TypeScript strict mode** - Full type safety across codebase  
✅ **ESLint** - Zero warnings, consistent code style  
✅ **Accessibility** - Semantic HTML, proper ARIA labels  
✅ **Responsive** - Mobile-first, tested across breakpoints  

## Architecture

### State Management
- Centralized state in `App.tsx` with `CVData` type
- Custom `useLocalStorage` hook for persistence (500ms debounce)
- State lifted to parent components for data flow

### Component Hierarchy
```
App.tsx (state hub)
├── SideBar (export, print, reset)
└── CVEditor (header editing)
    ├── SidePanel (personal info + skills)
    └── SectionsPanel (CV sections)
```

### CSS Architecture
- **index.css** (900+ lines) - Main styling:
  - A4 frame dimensions & layout
  - Responsive breakpoints (mobile, tablet, laptop, desktop, ultra-wide)
  - Drag-and-drop visual feedback
  - Section locking styles
  - Component-specific styles
- **App.css** - Sidebar buttons, modals, autosave indicator
- **print.css** - Print media queries (hides editing UI, clean formatting)

### Data Types
```typescript
type CVHeaderData = { name: string; title: string }
type CVPersonalData = { phone: string; email: string }
type CVSkill = { id: string; name: string; progress: number }
type CVSection = { id: string; title: string; body: string; locked?: boolean }
type CVData = { header, personal, skills[], sections[] }
```

## Key Features in Detail

### Drag-and-Drop
- **Sections**: Reorder with grab handles (⋮⋮), visual feedback during drag
- **Skills**: Reorder with drag handles, maintains order in localStorage
- Uses native drag/drop API with custom state management

### Auto-Save
- 500ms debounced save to localStorage
- Real-time "● Saving..." indicator in top-right
- Automatic recovery on page reload
- No external API required

### Responsive Breakpoints
- **Mobile (≤480px)**: Single column layout, full-width CV frame
- **Tablet (481-768px)**: Column layout, responsive widths
- **Laptop (769-1024px)**: Side-by-side editor & sidebar
- **Desktop (1025px+)**: Fixed A4 frame, wide sidebar
- **Ultra-wide (1440px+)**: Increased padding

### Print/PDF Export
- Print button triggers browser print dialog
- PDF export uses html2pdf.js with:
  - A4 page size
  - 2x scale for crisp output
  - Automatic hiding of editing UI
- Compatible with all major browsers

## Development Workflow

1. **Start dev server**: `pnpm dev`
2. **Edit components**: React Hot Module Replacement (HMR) enabled
3. **Run tests**: `pnpm test:watch`
4. **Check linting**: `pnpm lint`
5. **Build**: `pnpm build` (includes type checking)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT