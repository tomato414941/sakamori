export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  companyName?: string;
  phoneNumber?: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileFormData {
  displayName?: string;
  companyName?: string;
  phoneNumber?: string;
}
