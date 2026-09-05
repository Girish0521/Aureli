# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aureli** — An AI-powered online trial room web application that generates realistic 3D human models from user body measurements and allows virtual try-on of clothing.

**Current Status:** Prototype v0.1 — body measurement input and parametric 3D model generation working. Garment scraping and cloth simulation are planned for future iterations.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS 4
- **3D Rendering:** Three.js + React Three Fiber + Drei
- **State:** React hooks + localStorage (no external state management)
- **Package Manager:** npm

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main page (measurement form + 3D viewer)
│   └── globals.css         # Tailwind imports
├── components/
│   ├── MeasurementForm.tsx # Body measurement input with presets
│   ├── ModelViewer.tsx     # Three.js canvas wrapper
│   ├── HumanModel.tsx      # Parametric 3D human from primitives
│   └── Controls.tsx        # Animation toggle controls
├── lib/
│   ├── measurements.ts     # Validation, localStorage, presets
│   └── bodyMapper.ts       # Maps measurements → 3D scale factors
└── types/
    └── index.ts            # Shared TypeScript types
```

## Architecture Notes

### Parametric Human Model

The 3D body is built from Three.js primitives (capsules, cylinders, spheres) rather than using SMPL or pre-made meshes. This keeps the prototype browser-only with no Python backend needed.

Body measurements map to scale factors:
- **Height** → vertical scale of entire model
- **Chest** → torso width at chest level
- **Waist** → midsection width
- **Hips** → lower torso width
- **Shoulder Width** → shoulder joint positions
- **Weight** → overall volume scaling (cube root)

See `src/lib/bodyMapper.ts` for the mapping logic.

### State Management

- Measurements stored in browser `localStorage`
- No database or backend yet
- State flows: `page.tsx` → `MeasurementForm` → `ModelViewer` → `HumanModel`

### Animation

- Idle breathing: subtle torso scale oscillation
- Turntable: slow Y-axis rotation
- Both animations toggle via `Controls` component
- Smooth transitions when measurements change (lerp-based)

## Adding Features

### To add garment scraping (future):
1. Create `src/lib/scraper.ts` — Puppeteer-based scraper
2. Add input field for product URL in `page.tsx`
3. Extract images, fabric info, size chart from URL
4. Store scraped data in state

### To add 3D garment generation (future):
1. Set up Python backend (FastAPI)
2. Integrate PIFuHD or similar image-to-3D model
3. Convert product images → 3D garment mesh
4. Load garment GLB in `ModelViewer`

### To add cloth physics (future):
1. Integrate Cannon.js or Ammo.js
2. Create `src/components/ClothSimulation.tsx`
3. Drape garment mesh onto body mesh using physics

## Known Limitations

- Model proportions are approximate (not anthropometrically accurate)
- No real garment try-on yet (planned for v0.2+)
- No user authentication or profiles
- No mobile optimization yet
- Three.js loads on client only (no SSR for 3D)

## Git Workflow

Repository is initialized. To commit changes:

```bash
git add .
git commit -m "feat: describe your changes"
```

Follow conventional commit format: `feat:`, `fix:`, `refactor:`, `docs:`, etc.
