import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withAuth } from '@/components/auth';
import { useAuth } from '@/hooks/useAuth';
import { SEOHead } from '@/components/seo/SEOHead';

function Dashboard() {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();

  return (
    <>
      <SEOHead title="Dashboard" description="User dashboard" />
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.first_name || user?.email}!</h2>
                <p className="text-gray-600">This is your protected dashboard.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(Dashboard);

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  };
}

