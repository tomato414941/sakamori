# SignInForm Component

## Overview
`SignInForm` is a form component that handles user sign-in functionality in the SAKAMORI application.

## Features
- Email and password input fields
- Form validation
- Error handling and display
- Loading state management

## Usage

```tsx
import { SignInForm } from '@/components/auth/SignInForm';

function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
}
```

## Error Handling

The component handles the following error cases:
- Invalid email format
- Invalid credentials
- Network errors
- Rate limiting errors

## Form Validation
- Email must be a valid email format
- Password field cannot be empty
- Shows inline validation messages
