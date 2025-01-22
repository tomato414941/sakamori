import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthProvider';
import { AuthContextType } from '@/types/auth';
import { useRouter } from 'next/navigation';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  const router = useRouter();
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, loading, signIn, signUp, auth } = context;
  
  const signOut = async () => {
    try {
      await auth.signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
