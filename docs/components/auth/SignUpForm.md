# SignUpForm Component

## Overview
`SignUpForm` is a form component that handles new user registration in the SAKAMORI application.

## Features
- Email and password input fields
- Password confirmation
- Form validation
- Error handling and display
- Loading state management

## Usage

```tsx
import { SignUpForm } from '@/components/auth/SignUpForm';

function SignUpPage() {
  return (
    <div>
      <h1>Create Account</h1>
      <SignUpForm />
    </div>
  );
}
```

## Form Validation
- Email must be a valid email format
- Password must be at least 8 characters
- Password must contain at least one number
- Password confirmation must match
- Shows inline validation messages

## Error Handling

The component handles the following error cases:
- Email already in use
- Weak password
- Invalid email format
- Network errors
- Rate limiting errors

## Security Features
- Password strength indicator
- Real-time password validation
- Secure password handling
