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
        // ユーザー状態が変更されたときの処理
        if (user) {
          console.log('User is signed in:', user);
        } else {
          console.log('User is signed out');
        }
      },
      (error) => {
        console.error('Auth state change error:', error);
        setState((prev) => ({ ...prev, error: error as Error, loading: false }));
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', userCredential.user);
    } catch (error: any) {
      console.error('Sign in error:', error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error(error.message || 'An unknown error occurred'),
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful:', userCredential.user);
    } catch (error: any) {
      console.error('Sign up error:', error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error(error.message || 'An unknown error occurred'),
      }));
      throw error;
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
