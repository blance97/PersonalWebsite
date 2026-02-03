# Personal Website - Project Guide

## Project Overview

A modern personal portfolio website built with React 19 + TypeScript + Vite 6. Showcases Lance Dinh's software development experience, projects, and skills with a fully functional admin panel for content management.

## Tech Stack

### Frontend
- **React**: 19.0.0
- **React Router**: 7.5.0
- **TypeScript**: 5.7.0
- **Build Tool**: Vite 6.0.0
- **Styling**: CSS Modules with CSS Custom Properties (design system)
- **State Management**: React Context API
- **Data Persistence**: PostgreSQL via backend API (localStorage as cache/fallback)

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express 4.x
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6.x
- **Container**: Docker multi-stage build

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

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

### Backend
```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm run start        # Run production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
```

### Docker (Local Development)
```bash
docker-compose up    # Start all services (postgres, backend, frontend)
docker-compose down  # Stop all services
```

## Project Structure

```
personal-website/
├── src/                        # Frontend source
│   ├── main.tsx                # App entry point
│   ├── App.tsx                 # Root component with routing
│   ├── context/
│   │   └── ContentContext.tsx  # Content state (API + localStorage cache)
│   ├── services/
│   │   ├── api.ts              # Backend API client
│   │   └── github.ts           # GitHub API integration
│   ├── pages/                  # Route components
│   ├── components/             # Shared components
│   ├── data/                   # Default JSON data (fallback)
│   └── types/                  # TypeScript interfaces
├── backend/                    # Express API
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   └── routes/             # API route handlers
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Database seeding
│   ├── Dockerfile              # Backend container
│   └── package.json
├── docker-compose.yml          # Local development stack
├── Dockerfile                  # Frontend production container
└── Dockerfile.local            # Frontend local dev (with API proxy)
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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/content | Get all content (profile, experience, projects, skills) |
| PUT | /api/profile | Update profile |
| GET | /api/experience | List all experience |
| PUT | /api/experience | Bulk update experience (with order) |
| POST | /api/experience | Add new experience |
| DELETE | /api/experience/:id | Delete experience |
| GET | /api/projects | List all projects |
| PUT | /api/projects | Bulk update projects (with order) |
| POST | /api/projects | Add new project |
| DELETE | /api/projects/:id | Delete project |
| PUT | /api/skills | Update skills |
| GET | /api/github/config | Get GitHub config |
| PUT | /api/github/config | Update GitHub config |
| GET | /health | Health check |

## Admin Panel

### How It Works
The admin panel at `/admin` allows you to edit all site content without touching code:

1. **Content is persisted to PostgreSQL** - Changes survive deployments
2. **localStorage as cache/fallback** - Works offline, syncs when API available
3. **Default data from JSON files** - Used as fallback if API unavailable
4. **Export functionality** - Download your content as JSON for backup

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

### Local Development
```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# Database: localhost:5432
```

### Production (K8s)
Deployed via ArgoCD to homelab K3s cluster:
- **Frontend**: nginx serving static React build
- **Backend**: Node.js Express API
- **Database**: PostgreSQL StatefulSet with PVC
- **Auth**: OAuth2-proxy with Google authentication
- **Routing**: Cloudflare Tunnel

GitHub Actions automatically:
1. Builds and pushes Docker images to GHCR
2. Updates image tags in homelab-k3s-cluster repo
3. ArgoCD syncs changes to the cluster
