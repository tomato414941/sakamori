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

### Unit Tests
Located in `src/components/auth/__tests__/AuthProvider.test.tsx`

```typescript
describe('AuthProvider', () => {
  it('provides authentication context to children', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // Test context values are provided correctly
  });

  it('handles sign in', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // Test sign in functionality
  });

  it('handles sign out', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // Test sign out functionality
  });

  it('handles errors appropriately', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // Test error handling
  });
});
```

### Test Coverage
- Authentication state management
- Sign in/out functionality
- Error handling
- Loading states
- Context value updates

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
