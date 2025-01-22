# Authentication System

## Overview

SAKAMORI's authentication system is implemented using Firebase Authentication.
It provides email and password-based authentication for secure user management.

## Authentication Flow

1. **Sign Up**
   - Enter email and password
   - Password confirmation (minimum 8 characters)
   - Automatic sign-in after account creation

2. **Sign In**
   - Email and password authentication
   - Redirect to dashboard upon success

3. **Sign Out**
   - Click sign out button in header
   - Redirect to sign-in page

## Implementation Structure

### Directory Structure
```
src/
├── components/
│   └── auth/
│       ├── AuthProvider.tsx      # Authentication state management
│       ├── SignInForm.tsx        # Sign-in form
│       └── SignUpForm.tsx        # Sign-up form
└── hooks/
    └── useAuth.ts               # Authentication hook
```

### Firebase Configuration

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## Protected Routes

Protected routes are implemented using Next.js middleware:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/inventory/:path*']
};
```

## Security Considerations

1. **Password Requirements**
   - Minimum 8 characters
   - Password confirmation required

2. **Authentication State Persistence**
   - Uses Firebase persistence settings
   - Maintains auth state during browser session

3. **CSRF Protection**
   - Uses Firebase's built-in protection

## Testing Strategy

### Unit Tests
Tests are located in `__tests__` directories alongside the components.

### Integration Tests
Located in `cypress/integration/auth`.
