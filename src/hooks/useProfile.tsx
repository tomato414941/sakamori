'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAuth } from './useAuth';
import { UserProfile, UserProfileFormData } from '@/types/user';
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from '@/services/userService';

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  updateProfile: (data: UserProfileFormData) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        let userProfile = await getUserProfile(user.uid);

        if (!userProfile) {
          userProfile = await createUserProfile(user.uid, user.email!);
        }

        setProfile(userProfile);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const updateProfile = async (data: UserProfileFormData) => {
    if (!user || !profile) {
      throw new Error('No user logged in');
    }

    try {
      setLoading(true);
      setError(null);
      await updateUserProfile(user.uid, data);
      setProfile((prev) => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err instanceof Error ? err : new Error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
