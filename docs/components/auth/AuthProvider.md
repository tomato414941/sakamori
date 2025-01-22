# AuthProvider Component

## Overview
`AuthProvider` is a context provider component that manages authentication state throughout the SAKAMORI application. It integrates with Firebase Authentication to centrally manage user authentication states.

## Features
- Authentication state management and provision
- User sign-in/sign-out handling
- Error handling
- Loading state management

## Implementation

### Interfaces
```typescript
interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
```

### Usage

#### Root Application Setup
```tsx
// Use in application root
import { AuthProvider } from '@/components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

#### Using in Components
```tsx
// Use in child components
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user, loading, error, signOut } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <SignInPrompt />;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Error Handling

The component handles various authentication errors:

1. Sign In Errors
   - Invalid email/password
   - User not found
   - Too many attempts

2. Sign Up Errors
   - Email already in use
   - Weak password
   - Invalid email format

3. Network Errors
   - Connection timeout
   - Server unreachable

## Testing

Tests are located in `src/components/auth/__tests__/AuthProvider.test.tsx` and cover:

1. State Management
   - Initial loading state
   - Authentication state updates
   - Error state handling

2. Authentication Actions
   - Sign in success/failure
   - Sign up success/failure
   - Sign out functionality

3. Context Provision
   - Context accessibility
   - Hook functionality

## Security Considerations

1. State Protection
   - User state is cleared on sign out
   - Sensitive data is not persisted

2. Error Messages
   - Generic error messages for security
   - Detailed logging for debugging

3. Session Management
   - Automatic session refresh
   - Secure session persistence
