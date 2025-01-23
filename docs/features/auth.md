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

Protected routes are implemented using Next.js middleware to ensure secure access control:

### Protected Paths
The following paths require authentication:
- `/dashboard/*` - All dashboard-related pages
- `/inventory/*` - All inventory management pages

### Middleware Implementation

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route is protected
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/inventory');

  // Skip middleware for public routes
  if (!isProtectedRoute) {
    return;
  }

  // Check session
  const session = request.cookies.get('session');

  // Redirect to sign-in if no session
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/inventory/:path*'
  ]
};
```

### Authentication Flow
1. User attempts to access a protected route
2. Middleware checks for a valid session cookie
3. If no session exists:
   - User is redirected to `/signin`
   - Original request is blocked
4. If session exists:
   - Request proceeds normally
   - User can access the protected content

### Testing
Middleware tests are located in `src/__tests__/middleware.test.ts` and cover:
- Unauthenticated access to protected routes
- Authenticated access to protected routes
- Public route access

## Security Considerations

1. **Password Requirements**
   - Minimum 8 characters
   - Password confirmation required

2. **Authentication State**
   - Uses Firebase persistence settings
   - Maintains auth state during browser session
   - Session cookie for server-side validation

3. **Route Protection**
   - Server-side middleware validation
   - No client-side only protection
   - Protected routes:
     - `/dashboard/*`
     - `/inventory/*`

4. **CSRF Protection**
   - Uses Firebase's built-in protection
   - Session-based authentication
   - Secure cookie handling

5. **Error Handling**
   - Invalid credentials feedback
   - Session expiration handling
   - Graceful authentication failures

## Testing Strategy

### Unit Tests
Tests are located in `__tests__` directories alongside the components:

1. **Components**
   - `SignInForm.test.tsx`: Form validation and submission
   - `SignUpForm.test.tsx`: Registration flow and validation
   - `AuthProvider.test.tsx`: Authentication state management

2. **Middleware**
   - `middleware.test.ts`: Route protection tests
   - Test cases:
     - Unauthenticated access to protected routes
     - Authenticated access to protected routes
     - Public route access
     - Session validation

3. **Hooks**
   - `useAuth.test.ts`: Authentication hook functionality
   - Sign in/out operations
   - Authentication state updates

### Integration Tests
Located in `cypress/integration/auth`:
- Complete authentication flow
- Protected route navigation
- Session persistence
- Error scenarios

### Test Coverage
Ensure high test coverage for:
- Authentication flows
- Route protection
- Error handling
- Security features
