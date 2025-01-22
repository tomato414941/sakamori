# Header Component

## Overview
The Header component provides the main navigation bar for the SAKAMORI application. It adapts its display based on the user's authentication status and screen size.

## Features
- Responsive navigation bar
- Conditional rendering based on authentication state
- Mobile-friendly design

## Usage
```tsx
import Header from '@/components/layout/Header';

// Inside your layout component
<Header />
```

## Props
The Header component doesn't accept any props as it internally uses the `useAuth` hook for authentication state.

## Authentication States

### Unauthenticated
- Shows SAKAMORI logo (links to home)
- Displays main navigation links
- Shows "Sign in" button
- Hides user-specific elements

### Authenticated
- Shows SAKAMORI logo (links to home)
- Displays main navigation links
- Shows user email
- Shows "Sign out" button

## Responsive Design
- Desktop: Full navigation menu visible
- Mobile: Navigation menu hidden by default (to be implemented: hamburger menu)

## Testing
The component is thoroughly tested using Jest and React Testing Library. Tests cover:

1. Unauthenticated State
   - Logo rendering and linking
   - Navigation links presence
   - Sign in button visibility
   - Sign out button absence

2. Authenticated State
   - User email display
   - Sign out button visibility
   - Sign in button absence

3. Responsive Behavior
   - Mobile navigation hiding

Run tests with:
```bash
npm test
```

## Design Decisions
1. **Authentication State Management**
   - Uses `useAuth` hook for centralized auth state
   - Ensures consistent auth state across the app

2. **Navigation Structure**
   - Main links: Dashboard, Inventory, Licenses
   - Reflects core functionality of SAKAMORI

3. **Responsive Design**
   - Uses Tailwind CSS for responsive classes
   - Mobile-first approach
   - Semantic HTML structure

## Future Improvements
- [ ] Add hamburger menu for mobile navigation
- [ ] Implement active link highlighting
- [ ] Add user profile dropdown
- [ ] Improve accessibility features
