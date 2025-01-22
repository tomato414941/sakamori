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

## Testing

### Unit Tests
Located in `src/components/auth/__tests__/SignInForm.test.tsx`

```typescript
describe('SignInForm', () => {
  it('renders all form fields correctly', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Test empty fields
    fireEvent.click(submitButton);
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    
    // Test invalid email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('handles successful sign in', async () => {
    render(<SignInForm />);
    // Fill form and submit
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Verify success handling
  });

  it('handles sign in errors', async () => {
    render(<SignInForm />);
    // Test various error scenarios
  });
});

### Test Coverage
- Form rendering
- Input validation
- Error handling
- Success scenarios
- Loading states
- Integration with AuthProvider
