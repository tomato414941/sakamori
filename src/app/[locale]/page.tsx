'use client';

import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const { t } = useLocale();
  const { user } = useAuth();
  const params = useParams();
  const locale = params?.locale as string || 'ja';

  const features = [
    {
      title: t('home.features.license.title'),
      description: t('home.features.license.description'),
    },
    {
      title: t('home.features.requirements.title'),
      description: t('home.features.requirements.description'),
    },
    {
      title: t('home.features.guidance.title'),
      description: t('home.features.guidance.description'),
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto h-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {t('home.hero.description')}
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            {user ? (
              <Link
                href={`/${locale}/application`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('home.hero.dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href={`/${locale}/signin`}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href={`/${locale}/signup`}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {t('auth.signUp')} <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
              >
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
