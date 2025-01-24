'use client';

import { createContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
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
        setState((prev) => ({ ...prev, user, loading: false, error: null }));
      },
      (error) => {
        console.error('Auth state change error:', error);
        setState((prev) => ({ ...prev, error: error as Error, loading: false }));
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: any) => {
    console.error('Authentication error:', error);
    let errorMessage: string;
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'auth.error.invalidCredentials';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'auth.error.emailInUse';
        break;
      case 'auth/weak-password':
        errorMessage = 'auth.error.weakPassword';
        break;
      case 'auth/invalid-email':
        errorMessage = 'auth.error.invalidEmail';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'auth.error.tooManyRequests';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'auth.error.networkError';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'auth.error.operationNotAllowed';
        break;
      case 'auth/requires-recent-login':
        errorMessage = 'auth.error.requiresRecentLogin';
        break;
      default:
        console.error('Unhandled auth error:', error);
        errorMessage = 'auth.error.unknown';
    }
    
    setState((prev) => ({
      ...prev,
      error: { message: errorMessage, code: error.code },
      loading: false,
    }));

    throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await firebaseSignOut(auth);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
