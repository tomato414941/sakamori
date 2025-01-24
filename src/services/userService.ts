import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { UserProfile, UserProfileFormData } from '@/types/user';

export const createUserProfile = async (
  uid: string,
  email: string,
  role: UserProfile['role'] = 'staff'
): Promise<UserProfile> => {
  const userRef = doc(db, 'users', uid);
  const now = serverTimestamp();

  const profile: Omit<UserProfile, 'createdAt' | 'updatedAt'> & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
  } = {
    uid,
    email,
    role,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(userRef, profile);

  return {
    ...profile,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as UserProfile;
};

export const updateUserProfile = async (
  uid: string,
  data: UserProfileFormData
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};
