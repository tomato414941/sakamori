import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInForm } from '../SignInForm';
import { useAuth } from '@/hooks/useAuth';

// Mock useAuth hook
jest.mock('@/hooks/useAuth');

describe('SignInForm', () => {
  const mockSignIn = jest.fn();
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      signIn: mockSignIn,
      loading: false,
    });
  });

  it('renders sign in form', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'サインイン' })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    mockSignIn.mockResolvedValueOnce({});

    render(<SignInForm />);

    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'サインイン' });

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
    });

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    await waitFor(() => {
      expect(screen.getByText('サインインに成功しました')).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    mockUseAuth.mockReturnValue({
      signIn: mockSignIn,
      loading: true,
    });

    render(<SignInForm />);

    expect(screen.getByRole('button', { name: 'サインイン中...' })).toBeDisabled();
  });

  it('displays error message', async () => {
    const error = new Error('Invalid credentials');
    mockSignIn.mockRejectedValueOnce(error);

    render(<SignInForm />);

    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'サインイン' });

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'wrong-password');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(`エラー: ${error.message}`)).toBeInTheDocument();
    });
  });

  it('validates form fields', () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');

    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toBeRequired();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('has proper styling classes', () => {
    render(<SignInForm />);

    const form = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: 'サインイン' });

    expect(form).toHaveClass('space-y-4');
    expect(submitButton).toHaveClass(
      'w-full',
      'flex',
      'justify-center',
      'py-2',
      'px-4',
      'border',
      'border-transparent',
      'rounded-md',
      'shadow-sm',
      'text-sm',
      'font-medium',
      'text-white',
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'disabled:opacity-50'
    );
  });
});
