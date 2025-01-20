# Project Overview

## What is SAKAMORI?
SAKAMORI is an integrated management system for liquor retailers in Japan. It aims to streamline license management, inventory control, and sales management while improving business processes.

## Core Features
- License Application Management
- Inventory Management
- Sales Management
- Reporting Tools

## Tech Stack
### Backend
- Firebase Authentication: User authentication
- Cloud Firestore: Database
- Cloud Functions: Serverless functions

### Frontend (Web)
- Next.js 15.1.5
- React 19.0.0
- TailwindCSS 3.4.1
- TypeScript 5

### Frontend (Mobile) *Planned
- Expo
- React Native

## Implementation Status

### Completed Features
- Project basic setup
- Next.js + TypeScript development environment
- TailwindCSS setup
- Authentication foundation
  - Firebase Authentication integration
  - Sign-in functionality (backend)
  - Sign-up functionality (backend)
  - Sign-out functionality (backend)
  - Password reset functionality (backend)

### In Progress
- Authentication UI/UX
  - Sign-out button implementation
  - Password reset page and form
- User management functionality
  - User profile management
  - User role management (admin, staff)
  - User data persistence with Firestore

### Not Yet Implemented
- Backend API
- License management features
- Inventory management features
- Sales management features
- Reporting features
- Mobile application

## Development Setup
1. Clone the repository
```bash
git clone [repository-url]
cd sakamori
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env.local` file with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Other Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start the development server
```bash
npm run dev
```

## Development Guidelines
- Code Style: Follow ESLint and Prettier configurations
- Commit Messages: Follow Conventional Commits
- Branch Strategy: Based on GitHub Flow (see `branch-strategy.md` for details)

## Deployment
Currently evaluating deployment options:
- Vercel
- Firebase Hosting
- Other cloud platforms

## Project Structure
```
sakamori/
├── src/
│   ├── app/          # Next.js App Router
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Top page
│   ├── components/   # Reusable components
│   │   └── auth/       # Authentication components
│   ├── hooks/       # Custom hooks
│   │   └── useAuth.ts  # Authentication hook
│   ├── lib/         # Utilities
│   │   └── firebase/   # Firebase configuration
│   └── types/       # Type definitions
├── public/          # Static files
├── docs/           # Documentation
│   ├── project-overview.md  # Project overview
│   └── branch-strategy.md   # Branch strategy
└── README.md       # Project readme
