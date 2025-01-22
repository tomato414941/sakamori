'use client';

import { createContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { AuthContextType, AuthProviderProps, AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setState((prev) => ({ ...prev, user, loading: false }));
      },
      (error) => {
        setState((prev) => ({ ...prev, error: error as Error, loading: false }));
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const value = {
    user: state.user,
    loading: state.loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
