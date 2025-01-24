'use client';

import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type RequirementCategory = {
  id: string;
  title: string;
  items: {
    id: string;
    text: string;
    checked: boolean;
  }[];
};

export default function RequirementsPage() {
  const { t } = useLocale();
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<RequirementCategory[]>([
    {
      id: 'personal',
      title: t('dashboard.requirements.categories.personal.title'),
      items: [
        {
          id: 'age',
          text: t('dashboard.requirements.categories.personal.items.age'),
          checked: false,
        },
        {
          id: 'residence',
          text: t('dashboard.requirements.categories.personal.items.residence'),
          checked: false,
        },
        {
          id: 'disqualification',
          text: t('dashboard.requirements.categories.personal.items.disqualification'),
          checked: false,
        },
      ],
    },
    {
      id: 'business',
      title: t('dashboard.requirements.categories.business.title'),
      items: [
        {
          id: 'location',
          text: t('dashboard.requirements.categories.business.items.location'),
          checked: false,
        },
        {
          id: 'experience',
          text: t('dashboard.requirements.categories.business.items.experience'),
          checked: false,
        },
        {
          id: 'facilities',
          text: t('dashboard.requirements.categories.business.items.facilities'),
          checked: false,
        },
      ],
    },
    {
      id: 'financial',
      title: t('dashboard.requirements.categories.financial.title'),
      items: [
        {
          id: 'capital',
          text: t('dashboard.requirements.categories.financial.items.capital'),
          checked: false,
        },
        {
          id: 'stability',
          text: t('dashboard.requirements.categories.financial.items.stability'),
          checked: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const toggleRequirement = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, checked: !item.checked };
            }
            return item;
          }),
        };
      }
      return category;
    }));
  };

  const allRequirementsMet = categories.every(category =>
    category.items.every(item => item.checked)
  );

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('dashboard.requirements.title')}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('dashboard.requirements.description')}
          </p>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            {categories.map((category) => (
              <div key={category.id} className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {category.title}
                </h3>
                <div className="mt-4 divide-y divide-gray-200">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex flex-1">
                        <div className="flex-shrink-0">
                          {item.checked ? (
                            <CheckIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <XMarkIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-600">{item.text}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          type="button"
                          onClick={() => toggleRequirement(category.id, item.id)}
                          className={`${
                            item.checked
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gray-200 hover:bg-gray-300'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                        >
                          <span
                            aria-hidden="true"
                            className={`${
                              item.checked ? 'translate-x-5' : 'translate-x-0'
                            } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/documents')}
              disabled={!allRequirementsMet}
              className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                allRequirementsMet
                  ? 'bg-indigo-600 hover:bg-indigo-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('common.next')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
