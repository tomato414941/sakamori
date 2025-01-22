# Authentication Implementation

## Overview
This document details the technical implementation of SAKAMORI's authentication system. For a high-level overview, see [auth.md](../auth.md).

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

### Authentication Hook Implementation

```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthProvider';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Protected Route Implementation

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the user's session
  const session = request.cookies.get('session');

  // Check auth condition
  if (!session) {
    // Redirect to login if user is not authenticated
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/inventory/:path*']
};
```

## Testing Strategy

### Unit Tests
Located in `__tests__` directories alongside the components:

```typescript
// src/components/auth/__tests__/SignInForm.test.tsx
describe('SignInForm', () => {
  it('handles successful sign in', async () => {
    render(<SignInForm />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
```

### Integration Tests
Located in `cypress/integration/auth`:

```typescript
// cypress/integration/auth/authentication.spec.ts
describe('Authentication Flow', () => {
  it('allows user to sign in and access protected routes', () => {
    cy.visit('/signin');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="signin-button"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## Error Handling

### Common Error Cases
```typescript
export async function handleAuthError(error: FirebaseError) {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'Email already registered';
    default:
      return 'An unexpected error occurred';
  }
}
```

## Security Best Practices

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### CSRF Protection
```typescript
// src/middleware.ts
import { csrf } from '@/lib/csrf';

export async function middleware(request: NextRequest) {
  // Verify CSRF token for mutation requests
  if (request.method !== 'GET') {
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (!await csrf.verify(csrfToken)) {
      return new Response('Invalid CSRF token', { status: 403 });
    }
  }
  return NextResponse.next();
}
```

## Related Documentation
- [Authentication Overview](../auth.md)
- [AuthProvider Component](../components/AuthProvider.md)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
