# Authentication

## Overview
SAKAMORI's authentication system is implemented using Firebase Authentication. This document explains the implementation details and usage of the authentication features.

## Features
- Email/Password Sign-in
- New User Registration
- Sign-out
- Password Reset

## Implementation Structure

### Component Structure
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

### AuthProvider
Authentication state is managed and authentication information is shared throughout the application using this context provider.

#### Usage
```tsx
// _app.tsx
import { AuthProvider } from '@/components/auth/AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

#### Provided Features
- `user`: Current user information
- `loading`: Authentication loading state
- `error`: Authentication error information
- `signIn`: Sign-in function
- `signUp`: Sign-up function
- `signOut`: Sign-out function
- `resetPassword`: Password reset function

### useAuth Hook
A custom hook to easily use AuthProvider's features.

#### Usage
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, signIn, error } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <button onClick={handleSignIn}>Sign-in</button>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

## Error Handling
The authentication feature properly handles the following errors:

### Expected Errors
1. Sign-in failure
   - Invalid email/password
   - Non-existent account
2. Sign-up failure
   - Email already in use
   - Password requirements not met
3. Password reset failure
   - Non-existent email
   - Email sending failure

### Error Handling Implementation
```tsx
try {
  await signIn(email, password);
} catch (error) {
  // Error is automatically saved in AuthProvider's state
  // error.message can be used to get the error message
}
```

## Testing
The authentication feature is thoroughly tested using Jest + React Testing Library.

### Test Scope
1. Authentication state management
   - Initial state verification
   - State change verification
2. Error handling
   - Verification of various error cases
   - Error message display
3. User interaction
   - Form input processing
   - Button click processing

### Running Tests
```bash
# Run all tests
npm test

# Run only authentication-related tests
npm test auth
```

## Security Considerations
1. Password requirements
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one number
2. Rate limiting
   - Sign-in attempt limit
   - Password reset email sending limit

3. Session management
   - Automatic sign-out (not implemented)
   - Device management (not implemented)

## Future Enhancements
- [ ] Social login addition
- [ ] Two-factor authentication implementation
- [ ] Session management strengthening
- [ ] User profile expansion
