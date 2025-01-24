import { User } from 'firebase/auth';
import { ReactNode } from 'react';

export interface AuthError {
  message: string;
  code: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
