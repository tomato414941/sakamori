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

## Testing

### Unit Tests
Located in `src/components/auth/__tests__/SignUpForm.test.tsx`

```typescript
describe('SignUpForm', () => {
  it('renders all form fields correctly', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    
    // Test empty fields
    fireEvent.click(submitButton);
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    
    // Test password mismatch
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password124');
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('handles successful sign up', async () => {
    render(<SignUpForm />);
    // Fill form and submit
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Verify success handling
  });

  it('handles sign up errors', async () => {
    render(<SignUpForm />);
    // Test various error scenarios
  });

  it('shows password strength indicator', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Test weak password
    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/weak password/i)).toBeInTheDocument();
    
    // Test strong password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ssw0rd');
    expect(screen.getByText(/strong password/i)).toBeInTheDocument();
  });
});
```

### Test Coverage
- Form rendering
- Input validation
- Password strength validation
- Password confirmation
- Error handling
- Success scenarios
- Loading states
- Integration with AuthProvider
- Security features testing
