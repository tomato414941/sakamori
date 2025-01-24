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

## Implementation Details

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Authentication Hook
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
```

## Security Measures

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### Rate Limiting
- Maximum 5 failed login attempts per 15 minutes
- Account lockout after 5 failed attempts

### Session Management
- JWT-based authentication
- Token expiration after 1 hour
- Automatic token refresh

## Error Handling

### Common Error Cases
1. Invalid Email Format
   ```typescript
   if (!isValidEmail(email)) {
     throw new Error('Invalid email format');
   }
   ```

2. Weak Password
   ```typescript
   if (!meetsPasswordRequirements(password)) {
     throw new Error('Password does not meet requirements');
   }
   ```

3. Account Already Exists
   ```typescript
   try {
     await createUserWithEmailAndPassword(auth, email, password);
   } catch (error) {
     if (error.code === 'auth/email-already-in-use') {
       throw new Error('Account already exists');
     }
   }
   ```

## Testing

### Unit Tests
```typescript
describe('Authentication', () => {
  it('should sign in with valid credentials', async () => {
    const { user } = await signInWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );
    expect(user).toBeDefined();
  });

  it('should fail with invalid credentials', async () => {
    await expect(
      signInWithEmailAndPassword(auth, 'test@example.com', 'wrongpassword')
    ).rejects.toThrow();
  });
});
```

### Integration Tests
```typescript
describe('Authentication Flow', () => {
  it('should complete sign up flow', async () => {
    // Fill sign up form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Verify redirect to dashboard
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
  });
});
```
