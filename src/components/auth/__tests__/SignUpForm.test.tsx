import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpForm } from '../SignUpForm';
import { useAuth } from '@/hooks/useAuth';

// Mock useAuth
jest.mock('@/hooks/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('SignUpForm', () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      signUp: mockSignUp,
      loading: false,
      user: null,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<SignUpForm />);
    
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード（確認用）')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'アカウントを作成' })).toBeInTheDocument();
  });

  it('should display error when passwords do not match', async () => {
    render(<SignUpForm />);
    
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('パスワード（確認用）'), {
      target: { value: 'password456' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'アカウントを作成' }));
    
    expect(await screen.findByText('パスワードが一致しません')).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('should display error when password is less than 8 characters', async () => {
    render(<SignUpForm />);
    
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText('パスワード（確認用）'), {
      target: { value: '123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'アカウントを作成' }));
    
    expect(await screen.findByText('パスワードは8文字以上である必要があります')).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('should create account with valid input', async () => {
    render(<SignUpForm />);
    
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('パスワード（確認用）'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'アカウントを作成' }));
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    
    expect(await screen.findByText('アカウントの作成に成功しました')).toBeInTheDocument();
  });

  it('should handle Firebase authentication errors properly', async () => {
    mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    
    render(<SignUpForm />);
    
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('パスワード（確認用）'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'アカウントを作成' }));
    
    expect(await screen.findByText('このメールアドレスは既に使用されています')).toBeInTheDocument();
  });

  it('should disable button while loading', () => {
    mockUseAuth.mockReturnValue({
      signUp: mockSignUp,
      loading: true,
      user: null,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
    });

    render(<SignUpForm />);
    
    const button = screen.getByRole('button', { name: 'アカウント作成中...' });
    expect(button).toBeDisabled();
  });
});
