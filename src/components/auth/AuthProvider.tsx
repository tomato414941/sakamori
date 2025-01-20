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
      setState((prev) => ({ ...prev, loading: true }));
      await signInWithEmailAndPassword(auth, email, password);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await createUserWithEmailAndPassword(auth, email, password);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await firebaseSignOut(auth);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await sendPasswordResetEmail(auth, email);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
