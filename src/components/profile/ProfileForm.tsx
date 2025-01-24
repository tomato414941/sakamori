'use client';

import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useLocale } from '@/hooks/useLocale';
import { UserProfileFormData } from '@/types/user';

export default function ProfileForm() {
  const { profile, loading, error, updateProfile } = useProfile();
  const { t } = useLocale();
  const [formData, setFormData] = useState<UserProfileFormData>({
    displayName: profile?.displayName || '',
    companyName: profile?.companyName || '',
    phoneNumber: profile?.phoneNumber || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      await updateProfile(formData);
      setSuccessMessage(t('profile.updateSuccess'));
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t('profile.displayName')}
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t('profile.companyName')}
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t('profile.phoneNumber')}
        </label>
        <div className="mt-2">
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{t('profile.updateError')}</div>
      )}

      {successMessage && (
        <div className="text-green-500 text-sm">{successMessage}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        >
          {isSubmitting ? t('common.loading') : t('profile.save')}
        </button>
      </div>
    </form>
  );
}
