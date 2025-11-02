# PingCaset - Crypto Mining Web App

## Overview
PingCaset is a mobile-first crypto-style mining web application inspired by Pi Network. The app features a premium dark UI with neon gradients, realtime mining balance tracking, referral system, leaderboard, wallet functionality, and boost mechanics.

## Project Status
**Current State**: Fully migrated to Replit environment with all features working. Firebase authentication integrated, premium UI enhancements complete, WebSocket server added for realtime updates.

**Last Updated**: November 2, 2025

## Recent Changes

### November 2, 2025
- **Firebase Configuration Fix**: Updated authDomain to be dynamic based on VITE_FIREBASE_PROJECT_ID instead of hardcoded value
- **Premium UI Enhancements**:
  - Added particle background effect with canvas-based animation system
  - Implemented custom CSS animations (pulse-glow, float, glow)
  - Enhanced BalanceCard with gradient text and animated coin icon
  - Enhanced BoostCard with hover animations and conditional gradient backgrounds
  - Added glassmorphism effects and premium gradient overlays
- **WebSocket Server**: Implemented WebSocket support for realtime mining updates and leaderboard notifications
- **Performance Optimization**: Fixed ParticleBackground component to properly cleanup animation loop on unmount

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query v5
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

### Backend
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon-backed) + Drizzle ORM
- **Realtime**: Firebase Firestore + WebSocket
- **Authentication**: Firebase Auth (Google, Email/Phone)

### Build & Dev Tools
- **Bundler**: Vite
- **TypeScript**: Full type safety
- **Package Manager**: npm

## Project Architecture

### Data Flow
1. **Authentication**: Firebase Auth handles user login/signup
2. **Data Storage**: 
   - Firebase Firestore for user profiles, mining sessions, referrals (primary, realtime)
   - PostgreSQL for backup/analytics (secondary)
3. **Realtime Updates**: 
   - Firebase onSnapshot listeners for automatic data sync
   - WebSocket server for mining updates and notifications
4. **State Management**: TanStack Query for caching and synchronization

### Key Features
- ✅ Tap-to-mine mechanics with daily reset timer
- ✅ Boost system (+20%, +10%, +50% speed multipliers)
- ✅ Referral system with invite codes
- ✅ Global leaderboard with realtime rankings
- ✅ Wallet with transaction history
- ✅ User profiles with avatars
- ✅ Onboarding tutorial for new users
- ✅ Splash screen animation
- ✅ Mobile-first responsive design
- ✅ Dark theme with premium gradients
- ✅ Particle effects and premium animations

### File Structure
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ParticleBackground.tsx
│   │   ├── BalanceCard.tsx
│   │   ├── BoostCard.tsx
│   │   └── ...
│   ├── pages/             # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── Team.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Wallet.tsx
│   │   └── Profile.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useRealtimeProfile.ts
│   │   ├── useRealtimeLeaderboard.ts
│   │   └── ...
│   ├── services/          # API/Firebase service layers
│   │   ├── userService.ts
│   │   ├── miningService.ts
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   └── lib/               # Utilities
│       ├── firebase.ts
│       └── queryClient.ts
server/
├── routes.ts              # API routes + WebSocket server
├── storage.ts             # Storage interface
└── index.ts               # Express server setup
shared/
└── schema.ts              # Drizzle database schema
```

## Environment Variables
Required secrets (already configured):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_PROJECT_ID`
- `DATABASE_URL` (Postgres connection)

## Development

### Running the Project
```bash
npm run dev
```
This starts:
- Express server (backend)
- Vite dev server (frontend)
- Both on the same port (5000) via Vite middleware

### Database Operations
```bash
# Push schema changes to database
npm run db:push

# Force push (if warnings)
npm run db:push --force
```

### Key Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run db:push` - Sync database schema

## Design System

### Colors
- **Primary**: Crimson/Red (`hsl(340, 75%, 32%)`)
- **Secondary**: Blue/Purple gradients
- **Background**: Dark (`hsl(220, 18%, 8%)`)
- **Accents**: Neon blue, purple, gold

### Animations
- `pulse-glow`: Pulsing glow effect for important elements
- `float`: Gentle floating animation
- `glow`: Opacity animation for glowing effects
- Framer Motion for component transitions

### Theme
- Mobile-first responsive design
- Dark mode optimized
- Glassmorphism effects
- Gradient overlays
- Particle background effects

## User Preferences
- **UI Style**: Premium dark theme with neon gradients and particle effects
- **Realtime**: All features use Firebase onSnapshot for instant updates
- **Performance**: Optimized particle effects with proper cleanup

## Known Issues
- None currently

## Future Enhancements
- [ ] Add more boost types
- [ ] Implement achievement system
- [ ] Add social sharing features
- [ ] Mobile app version (PWA)
