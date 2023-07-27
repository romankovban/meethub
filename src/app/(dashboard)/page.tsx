import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/next-auth.config';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect('/sign-in');
  }

  return <div>{JSON.stringify(user, null, 2)}</div>;
}
