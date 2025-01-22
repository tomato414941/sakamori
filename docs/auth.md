# Authentication System

## Overview

SAKAMORI's authentication system is implemented using Firebase Authentication.
It provides email and password-based authentication for secure user management.

## Components and Features

### AuthProvider

A context provider that manages authentication state across the application.

```tsx
// _app.tsx or layout.tsx
import { AuthProvider } from '@/components/auth/AuthProvider';

export default function App({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### useAuth Hook

A custom hook that provides authentication-related functionality.

```tsx
const { user, loading, signIn, signUp, signOut } = useAuth();
```

Available features:
- Sign in (`signIn`)
- Sign up (`signUp`)
- Sign out (`signOut`)
- Get authentication state (`user`)
- Get loading state (`loading`)

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

## Protected Routes

Use `DashboardLayout` to protect pages that require authentication:

```tsx
export default function ProtectedPage() {
  return (
    <DashboardLayout>
      <div>Protected Content</div>
    </DashboardLayout>
  );
}
```

## Error Handling

Handles the following error cases:

- Email already in use
- Password does not meet requirements
- Invalid credentials
- Network errors

## Testing

Authentication-related tests are located in:

- `src/components/auth/__tests__/SignUpForm.test.tsx`
- `src/components/auth/__tests__/SignInForm.test.tsx`

## Security Considerations

1. **Password Requirements**
   - Minimum 8 characters
   - Password confirmation required

2. **Authentication State Persistence**
   - Uses Firebase persistence settings
   - Maintains auth state during browser session

3. **CSRF Protection**
   - Uses Firebase's built-in protection

## Future Development Plans

1. **Password Reset Feature**
   - Password reset email sending
   - Reset form implementation

2. **Social Login**
   - Google authentication
   - Additional providers

3. **Multi-factor Authentication**
   - SMS authentication
   - Email verification
