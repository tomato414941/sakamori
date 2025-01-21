import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthProvider } from '@/components/auth/AuthProvider';

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

describe('useAuth', () => {
  let firebaseAuth;

  beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth = require('firebase/auth');
  });

  it('returns auth context when used within AuthProvider', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for async operations to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('signIn');
    expect(result.current).toHaveProperty('signUp');
    expect(result.current).toHaveProperty('signOut');
    expect(result.current).toHaveProperty('resetPassword');
  });

  it('throws error when used outside of AuthProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Suppress React error logging

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    console.error = consoleError; // Restore console.error
  });

  it('provides authentication methods', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });
    // Wait for async operations to complete
    await waitFor(() => {
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.signUp('test@example.com', 'password');
    });

    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.signOut();
    });
    // Wait for async operations to complete
    await waitFor(() => {
      expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.resetPassword('test@example.com');
    });

    expect(firebaseAuth.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
  });

  it('provides auth state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for async operations to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.user).toBeDefined();
    expect(result.current.loading).toBeDefined();
    expect(result.current.error).toBeDefined();
  });
});
