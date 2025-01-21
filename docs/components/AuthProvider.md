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

### Using Authentication State
```tsx
// アプリケーションのルートで使用
import { AuthProvider } from '@/components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

// 子コンポーネントでの使用
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user, loading, error, signOut } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Error Handling

### Types of Errors
1. **Authentication Errors**
   - Invalid authentication credentials
   - Non-existent account
   - Password mismatch

2. **Network Errors**
   - Connection errors
   - Timeouts

3. **Other Errors**
   - Unexpected errors
   - Firebase service errors

### Error Handling Implementation
```typescript
try {
  setState(prev => ({ ...prev, loading: true, error: null }));
  await authAction();
} catch (error) {
  setState(prev => ({
    ...prev,
    error: error instanceof Error ? error : new Error('An unknown error occurred')
  }));
} finally {
  setState(prev => ({ ...prev, loading: false }));
}
```

## Testing

### Test Cases
1. **Initial State**
   - Proper initial values
   - Loading state verification

2. **Authentication Flow**
   - Successful sign-in/sign-out
   - Password reset

3. **Error Handling**
   - Proper error handling
   - Error message display
   - State recovery

### Test Example
```typescript
describe('AuthProvider', () => {
  it('provides initial auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged out');
    });
  });

  it('handles auth errors', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Sign In'));
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Auth error');
  });
});
```

## Performance Considerations

### Memoization
- Optimized state updates
- Prevention of unnecessary re-renders
- Context splitting consideration

### Cleanup
- Proper listener removal
- Prevention of memory leaks
- State reset

## Security Considerations
1. Authentication state protection
2. Session management
3. Proper error message display

## Future Improvements
- [ ] Implement refresh tokens
- [ ] Manage session timeouts
- [ ] Support multi-factor authentication
- [ ] Integrate social login
