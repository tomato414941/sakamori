'use client';

import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DashboardPage() {
  const { t } = useLocale();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const steps = [
    {
      id: 'requirements',
      name: t('dashboard.steps.requirements.title'),
      description: t('dashboard.steps.requirements.description'),
      href: '/requirements',
      status: 'notStarted',
    },
    {
      id: 'documents',
      name: t('dashboard.steps.documents.title'),
      description: t('dashboard.steps.documents.description'),
      href: '/documents',
      status: 'notStarted',
    },
    {
      id: 'guide',
      name: t('dashboard.steps.guide.title'),
      description: t('dashboard.steps.guide.description'),
      href: '/guide',
      status: 'notStarted',
    },
  ];

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('dashboard.title')}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('dashboard.description')}
          </p>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {steps.map((step, stepIdx) => (
                <li key={step.id}>
                  <Link
                    href={step.href}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="truncate text-sm font-medium text-indigo-600">
                                {step.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                {step.description}
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  {t(`dashboard.steps.${step.id}.status.${step.status}`)}
                                </p>
                                {step.status === 'completed' && (
                                  <div className="mt-2 flex items-center text-sm text-green-500">
                                    <CheckIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    {t('common.completed')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
