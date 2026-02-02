# Personal Website - Project Guide

## Project Overview

A modern personal portfolio website built with React 19 + TypeScript + Vite 6. Showcases Lance Dinh's software development experience, projects, and skills with a fully functional admin panel for content management.

## Tech Stack

### Current Stack (Modernized)
- **React**: 19.0.0
- **React Router**: 7.5.0
- **TypeScript**: 5.7.0
- **Build Tool**: Vite 6.0.0
- **Styling**: CSS Modules with CSS Custom Properties (design system)
- **State Management**: React Context API
- **Data Persistence**: localStorage with JSON export/import

### Key Features
- ✅ Modern React 19 with functional components and hooks
- ✅ TypeScript throughout the codebase
- ✅ CSS Modules for scoped styling
- ✅ CSS Custom Properties for theming
- ✅ React Router for navigation
- ✅ Admin panel for dynamic content management
- ✅ No third-party UI libraries (native HTML/CSS components)
- ✅ Responsive design
- ✅ SVG icons (no icon libraries)

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build
npm run build        # TypeScript check + Vite build

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # ESLint check
```

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── App.tsx                     # Root component with routing
├── App.css                     # Root styles
├── index.css                   # Global styles & design system
├── vite-env.d.ts               # Vite type declarations
├── assets/                     # Images (RoseSeal.png, etc.)
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Header.module.css
│   ├── FooterNew.tsx           # Footer with social links
│   └── Footer.module.css
├── context/
│   └── ContentContext.tsx      # Content state management
├── data/
│   ├── profile.json            # Personal info
│   ├── experience.json         # Work history
│   ├── projects.json           # Project portfolio
│   └── skills.json             # Technical skills
├── pages/
│   ├── HomePage.tsx            # Home/landing page
│   ├── HomePage.module.css
│   ├── ExperiencePage.tsx      # Work experience
│   ├── ExperiencePage.module.css
│   ├── ProjectsPage.tsx        # Projects showcase
│   ├── ProjectsPage.module.css
│   ├── ResumePage.tsx          # Resume & skills
│   ├── ResumePage.module.css
│   ├── AdminPage.tsx           # Admin panel
│   └── AdminPage.module.css
└── types/
    └── index.ts                # TypeScript interfaces
```

## Modernization Roadmap

### Phase 1: Update Dependencies & Fix Compatibility ✅ COMPLETED
- [x] Update React to latest version (19.x)
- [x] Update Vite to latest (6.x)
- [x] Update TypeScript to latest (5.x)
- [x] Remove legacy `material-ui` imports - replaced with native components
- [x] Convert all `.js` components to `.tsx` with proper TypeScript types
- [x] Convert class components to functional components with hooks

### Phase 2: Modern Styling Approach ✅ COMPLETED
- [x] Remove inline styles
- [x] Implement CSS Modules (`*.module.css`) for component-scoped styles
- [x] Create a design system with CSS custom properties (variables)
- [x] Implement responsive design with native CSS (Grid, Flexbox)
- [x] Remove MUI entirely in favor of native HTML/CSS components

### Phase 3: Remove Third-Party Dependencies ✅ COMPLETED
- [x] Replace MUI AppBar with native `<header>` + `<nav>`
- [x] Replace MUI IconButton with native `<button>` + SVG icons
- [x] Replace MUI Paper with styled `<div>` elements
- [x] Create custom Button component
- [x] Create custom Card component for Job/Project items
- [x] Use native CSS transitions and animations

### Phase 4: Add Routing & Navigation ✅ COMPLETED
- [x] Install React Router v7
- [x] Create page components (Home, Experience, Projects, Resume, Admin)
- [x] Implement navigation with active states

### Phase 5: Data Management & Admin Panel ✅ COMPLETED
- [x] Create a `data/` directory with JSON files for content
- [x] Create React Context for content management
- [x] Build Admin Panel with:
  - Profile editor (with birth date for dynamic age)
  - Experience editor (add/edit/delete/reorder)
  - Projects editor (add/edit/delete/reorder, image upload)
  - Skills editor
  - GitHub integration settings
  - Export JSON functionality
  - Reset to defaults
- [x] GitHub integration for importing repos
- [x] Image upload (file or URL) for projects
- [x] Authentication for admin panel (email: lancedinh7@gmail.com)

### Phase 6: Security & Authentication ✅ COMPLETED
- [x] Admin panel protected with login
- [x] Session-based auth (7-day expiry)
- [x] Admin link hidden from nav when not logged in
- [x] Allowed email whitelist (lancedinh7@gmail.com)

### Phase 7: Future Enhancements
- [ ] Add dark/light theme toggle
- [ ] Add animations with CSS transitions
- [ ] Implement lazy loading for images
- [ ] Add SEO meta tags
- [ ] Create 404 page
- [ ] Add contact form
- [ ] Performance optimization (code splitting, image optimization)

## Admin Panel

### How It Works
The admin panel at `/admin` allows you to edit all site content without touching code:

1. **Content is stored in localStorage** - Changes persist in the browser
2. **Default data from JSON files** - Initial content comes from `src/data/*.json`
3. **Export functionality** - Download your content as JSON for backup or version control
4. **Reset to defaults** - Restore original content from JSON files

### Available Editors
- **Profile** - Name, title, bio, social links, resume link, etc.
- **Experience** - Add/edit/delete/reorder work history entries
- **Projects** - Add/edit/delete/reorder project entries
- **Skills** - Languages, tools, and coursework
- **GitHub** - Configure GitHub integration for automatic repo display

### Routes
```
/              - Home page
/experience    - Work history
/projects      - Project portfolio
/resume        - Resume & skills
/admin         - Admin dashboard
```

## GitHub Integration

### Features
- Automatically fetches your public GitHub repositories
- Optional: Include private repositories with a personal access token
- Filter out forked repos if desired
- Pin specific repos to show them first
- Exclude repos you don't want displayed
- Shows repo metadata: language, stars, topics

### Setup for Private Repos
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. Go to `/admin` → GitHub tab
4. Enter your token and check "Include Private Repositories"
5. Save settings

### Configuration Options
- **Username**: Your GitHub username
- **Personal Access Token**: Required for private repos (stored in localStorage)
- **Include Private**: Show private repos (requires token)
- **Include Forks**: Show forked repositories
- **Pinned Repos**: Comma-separated repo names to feature first
- **Exclude Repos**: Comma-separated repo names to hide

## Admin Authentication

### How It Works
- Admin panel (`/admin`) is protected with email/password login
- Only `lancedinh7@gmail.com` can access the admin area
- Session stored in localStorage (expires after 7 days)
- Admin link in navigation is hidden when not logged in

### Default Credentials
- **Email**: lancedinh7@gmail.com
- **Password**: admin123 (change this after first login!)

### To Access Admin Panel
1. Navigate to `/admin` directly in your browser
2. Enter your email and password
3. Once logged in, the "Admin" link appears in the navigation

### Security Notes
- This is client-side authentication for basic protection
- For production, consider adding server-side authentication
- The password is stored as a hash in localStorage
- Sessions expire after 7 days of inactivity

## Design Guidelines

### Color Palette (to be defined)
```css
:root {
  --color-primary: #0288D1;
  --color-secondary: #333333;
  --color-accent: #42a5f5;
  --color-text: #213547;
  --color-text-muted: #546e7a;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
}
```

### Typography
- Headings: System font stack or Google Fonts (Inter, Montserrat)
- Body: System font stack
- Code: Monospace (JetBrains Mono, Fira Code)

### Spacing
Use consistent spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## File Naming Conventions
- Components: PascalCase (`AboutMe.tsx`)
- Styles: `ComponentName.module.css`
- Utilities: camelCase (`formatDate.ts`)
- Data files: kebab-case (`work-experience.json`)

## Testing (Future)
- Vitest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests

## Deployment
- Build with `npm run build`
- Output in `dist/` directory
- Deploy to Vercel, Netlify, GitHub Pages, or K8s cluster
- Use Cloudflare/Route53 for DNS routing
