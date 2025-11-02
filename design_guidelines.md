# PingCaset Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Pi Network's mining interface, combined with Stripe's premium restraint and Linear's sophisticated typography. The design creates a trustworthy, futuristic crypto dashboard that feels both cutting-edge and established.

## Core Design Principles
1. **Premium Trust**: Every element reinforces credibility and sophistication
2. **Futuristic Clarity**: Advanced aesthetics with intuitive usability
3. **Mining Focus**: The mining counter is the hero element
4. **Mobile-First Excellence**: Thumb-friendly interactions, optimized for one-handed use

---

## Typography

**Font Families**:
- Primary: Inter (headings, UI elements) - Google Fonts
- Secondary: JetBrains Mono (numbers, mining stats, referral codes) - Google Fonts

**Hierarchy**:
- Hero Numbers (Mining Balance): 48px/56px, JetBrains Mono, semi-bold
- Page Titles: 32px/40px, Inter, bold
- Section Headers: 24px/32px, Inter, semi-bold
- Body Text: 16px/24px, Inter, regular
- Small Stats/Labels: 14px/20px, Inter, medium
- Micro Text (timestamps): 12px/16px, Inter, regular

---

## Layout System

**Spacing Units**: Tailwind utilities based on 4px grid - commonly use 2, 4, 6, 8, 12, 16, 20, 24

**Container Strategy**:
- Mobile: px-4 (16px horizontal padding)
- Desktop: max-w-6xl mx-auto with px-6
- Dashboard sections: py-6 on mobile, py-12 on desktop

**Grid System**:
- Single column on mobile (default)
- 2-column for stats cards on tablet (md:grid-cols-2)
- 3-column for leaderboard/team on desktop (lg:grid-cols-3)

---

## Color Architecture

**Base Palette**:
- Primary Dark: Deep charcoal/navy background (#0F1419 or similar)
- Raspberry Maroon: Primary accent (#8B1538, #A01A3F for highlights)
- Pure White: Text and card backgrounds (#FFFFFF)
- Gold Accent: Rewards and achievements (#FFD700, #FFA500)

**Functional Colors**:
- Success/Mining Active: Vibrant green (#10B981)
- Warning/Boost Available: Amber (#F59E0B)
- Neutral Gray: Disabled states (#6B7280)

**Application**:
- Dark backgrounds with white text creates premium contrast
- Raspberry maroon for primary CTAs, mining button, active states
- Gold for coin icons, special badges, premium features
- White cards with subtle shadows on dark backgrounds

---

## Component Library

### 1. Mining Dashboard Components

**Mining Counter Card**:
- Large glassmorphic card with subtle blur effect
- Prominent JetBrains Mono numbers with glow effect
- Real-time animated counter with smooth transitions
- Background: white card with soft shadow, or dark translucent with border

**Tap-to-Mine Button**:
- Large circular button (120px diameter on mobile, 160px on desktop)
- Raspberry maroon background with white icon
- Pulsing animation when active (subtle scale 1.0 to 1.05)
- Haptic feedback indication with ripple effect

**Stats Grid**:
- 2x2 grid on mobile, 4-column on desktop
- Small cards showing: Mining Speed, Total Mined, Active Time, Daily Reset
- Icons with labels, monospace numbers
- Subtle border treatment, no heavy shadows

### 2. Navigation

**Bottom Tab Bar (Mobile)**:
- Fixed bottom navigation with 4-5 tabs
- Icons with labels: Dashboard, Team, Leaderboard, Wallet, Profile
- Active state: raspberry maroon with white icon
- Inactive: gray with smooth transition

**Top Header**:
- Logo/app name on left
- Notification bell and settings icon on right
- Sticky on scroll with backdrop blur
- Clean white or translucent dark background

### 3. Cards & Containers

**Glassmorphic Cards**:
- Semi-transparent white backgrounds (rgba(255,255,255,0.05) on dark, or solid white on dark bg)
- Backdrop blur: 12px
- Border: 1px solid rgba(255,255,255,0.1)
- Border radius: 16px for cards, 12px for smaller elements
- Subtle shadow: 0 8px 32px rgba(0,0,0,0.1)

**Neumorphic Elements** (Use Sparingly):
- Only for primary buttons and key interactive elements
- Soft inner/outer shadows creating depth
- Raspberry maroon or white base with subtle emboss

### 4. Referral & Team Components

**Referral Code Display**:
- Large dashed border box
- Monospace code in center
- Copy button with success state
- Share icons below (Telegram, WhatsApp, Twitter, Copy Link)

**Team Tree Visualization**:
- Card-based hierarchy showing levels
- Avatar placeholders with initials
- Connection lines in raspberry maroon
- Expandable/collapsible sections

**Leaderboard Table**:
- Rank badges (1st gold, 2nd silver, 3rd bronze)
- Avatar, username, mining total columns
- Highlight current user row with raspberry maroon background
- Sticky header on scroll

### 5. Wallet Components

**Balance Display**:
- Large card with coin icon and balance
- Available vs. Pending breakdown
- Small chart visualization (optional line graph)

**Transaction History**:
- List of cards with icon, description, amount, timestamp
- Color-coded: green for credits, red for debits
- "Load More" button at bottom

**Withdraw Button**:
- Grayed out/disabled state clearly communicated
- "Coming Soon" badge overlay
- Tooltip explaining availability timeline

### 6. Profile & Settings

**Profile Header**:
- Large avatar with edit icon
- Username with inline edit capability
- Country flag and location selector
- Member since badge with date

**Editable Fields**:
- Clean form inputs with subtle borders
- Labels above fields
- Raspberry maroon focus states
- Save button at bottom

### 7. Onboarding & Modals

**Splash Screen**:
- Full-screen with centered logo
- Animated entrance (fade + slight scale)
- Tagline below logo
- Progress indicator at bottom

**Tutorial Overlay**:
- Dark overlay with spotlight on feature
- White tooltip card with arrow pointer
- Step counter (1/5, 2/5, etc.)
- Next/Skip buttons in raspberry maroon

**Authentication Forms**:
- Clean centered cards (max-w-md)
- Social login buttons with brand colors
- Divider with "OR" text
- Input fields with icons
- Primary CTA in raspberry maroon

---

## Visual Effects & Animations

**Particle Effects**:
- Subtle floating particles on dashboard background (10-15 small dots)
- Slow upward drift animation
- Low opacity white/gold particles
- Only on main mining dashboard

**Transitions**:
- Page transitions: 200ms ease-in-out
- Button hover: 150ms
- Card hover lift: transform translateY(-2px) with shadow increase
- Number counting: smooth increment animation

**Glow Effects**:
- Mining counter has subtle glow when active
- Primary buttons have soft inner glow
- Achievement badges have gentle pulsing glow

**Animation Rules**:
- Keep animations under 300ms for responsiveness
- Use sparingly - only for feedback and delight
- Disable on user preference (prefers-reduced-motion)

---

## Responsive Breakpoints

- Mobile: < 640px (base styles, single column)
- Tablet: 640px - 1024px (2-column grids, expanded cards)
- Desktop: > 1024px (3-4 column grids, sidebar navigation option)

**Mobile Optimizations**:
- Larger touch targets (minimum 44px)
- Bottom navigation for thumb reach
- Swipe gestures for tab switching
- Simplified stats on smaller screens

---

## Images & Icons

**Icon Library**: Heroicons (outline for inactive, solid for active states)

**Images Needed**:
- App logo/icon for splash and header
- Default avatar placeholder
- Coin/token icon for balance displays
- Achievement badge graphics (gold, silver, bronze)
- Empty state illustrations (no referrals, no transactions)

**No Large Hero Images**: This is a dashboard app, not a marketing site. Focus on data visualization and interactive elements rather than hero imagery.

---

## Accessibility Standards

- WCAG AA contrast ratios maintained (white on raspberry maroon, white on dark backgrounds)
- Focus states clearly visible with 2px raspberry maroon outlines
- Screen reader labels for all interactive elements
- Keyboard navigation support throughout
- Error messages in clear language with icons

---

## Premium Polish Details

- Micro-interactions on all buttons (subtle scale, shadow changes)
- Loading states with branded skeleton screens (raspberry maroon shimmer)
- Success states with checkmark animations
- Empty states with encouraging copy and clear CTAs
- Consistent rounded corners (16px cards, 8px buttons, 24px for modals)
- Subtle gradient overlays on dark backgrounds (vertical gradient from navy to deep purple)

This design creates a trustworthy, premium crypto mining experience that feels both sophisticated and approachable, with raspberry maroon as the distinctive brand accent throughout.