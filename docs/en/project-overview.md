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

## Project Structure
```
sakamori/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── styles/        # Global styles and Tailwind config
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
├── docs/            # Project documentation
└── tests/           # Test files
```

## Getting Started

### Prerequisites
- Node.js 20.0.0 or later
- npm 10.0.0 or later
- Firebase project with Authentication and Firestore enabled

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/sakamori.git
   cd sakamori
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style
- Follow ESLint and Prettier configurations
- Use TypeScript for type safety
- Follow component-based architecture
- Write unit tests for new features

### Testing
- Unit tests with Jest and React Testing Library
- E2E tests with Cypress
- Run tests before committing:
  ```bash
  npm run test
  ```

### Documentation
- Document new features and APIs
- Keep documentation up to date with code changes
- Write documentation in both English and Japanese
