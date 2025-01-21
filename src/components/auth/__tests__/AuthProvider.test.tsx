import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from '../AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '../AuthProvider';

// Mock Firebase Auth
jest.mock('firebase/auth', () => {
  const auth = {
    currentUser: null,
  };
  const signInWithEmailAndPassword = jest.fn();
  const createUserWithEmailAndPassword = jest.fn();
  const signOut = jest.fn();
  const sendPasswordResetEmail = jest.fn();

  return {
    getAuth: jest.fn(() => auth),
    onAuthStateChanged: jest.fn((auth, callback) => {
      Promise.resolve().then(() => callback(auth.currentUser));
      return jest.fn();
    }),
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
  };
});

describe('AuthProvider', () => {
  let firebaseAuth;

  beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth = require('firebase/auth');
  });

  const TestComponent = () => {
    const auth = useAuth();
    return (
      <div>
        <div data-testid="loading">{auth.loading.toString()}</div>
        <div data-testid="user">{auth.user ? 'logged in' : 'logged out'}</div>
        <div data-testid="error">{auth.error?.message || 'no error'}</div>
        <button onClick={() => auth.signIn('test@example.com', 'password')}>
          Sign In
        </button>
        <button onClick={() => auth.signUp('test@example.com', 'password')}>
          Sign Up
        </button>
        <button onClick={() => auth.signOut()}>Sign Out</button>
        <button onClick={() => auth.resetPassword('test@example.com')}>
          Reset Password
        </button>
      </div>
    );
  };

  it('provides initial auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // 初期状態をチェック
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    
    // 非同期処理の完了を待つ
    await act(async () => {
      await Promise.resolve();
    });

    // 認証状態の更新後をチェック
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('logged out');
    expect(screen.getByTestId('error')).toHaveTextContent('no error');
  });

  it('handles auth state changes', async () => {
    const mockUser = { email: 'test@example.com', uid: '123' };
    firebaseAuth.getAuth().currentUser = mockUser;

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for auth state to update
    await act(async () => {
      const onAuthStateChanged = firebaseAuth.onAuthStateChanged;
      const callback = onAuthStateChanged.mock.calls[0][1];
      callback(mockUser);
    });

    expect(screen.getByTestId('user')).toHaveTextContent('logged in');
  });

  it('handles sign in', async () => {
    const mockUser = { email: 'test@example.com', uid: '123' };
    firebaseAuth.signInWithEmailAndPassword.mockResolvedValueOnce({
      user: mockUser,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Sign In').click();
    });

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password'
    );
  });

  it('handles sign up', async () => {
    const mockUser = { email: 'test@example.com', uid: '123' };
    firebaseAuth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: mockUser,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Sign Up').click();
    });

    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password'
    );
  });

  it('handles sign out', async () => {
    firebaseAuth.signOut.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Sign Out').click();
    });

    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });

  it('handles password reset', async () => {
    firebaseAuth.sendPasswordResetEmail.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Reset Password').click();
    });

    expect(firebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com'
    );
  });

  it('handles auth errors', async () => {
    // サインインのモックを設定
    firebaseAuth.signInWithEmailAndPassword.mockImplementation(() => {
      return Promise.reject(new Error('Auth error'));
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // 初期状態の非同期処理を待つ
    await act(async () => {
      await Promise.resolve();
    });

    // サインインを試行し、エラーが発生するのを待つ
    await act(async () => {
      screen.getByText('Sign In').click();
      // エラーが発生するのを待つ
      await Promise.resolve();
    });

    // エラーメッセージを確認
    await act(async () => {
      await Promise.resolve();
      expect(screen.getByTestId('error')).toHaveTextContent('Auth error');
    });
  });

  it('cleans up auth listener on unmount', () => {
    const unsubscribe = jest.fn();
    const onAuthStateChanged = firebaseAuth.onAuthStateChanged;
    onAuthStateChanged.mockReturnValueOnce(unsubscribe);

    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
