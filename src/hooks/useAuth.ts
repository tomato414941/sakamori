import { useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuthContext } from '@/components/auth/AuthProvider';
import { AuthContextType } from '@/types/auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string || 'ja';
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, loading, error, signIn, signUp, resetPassword, signOut: contextSignOut } = context;
  
  const signOut = async () => {
    try {
      await contextSignOut();
      router.push(`/${locale}/signin`);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};
