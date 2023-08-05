import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/next-auth.config';
import { redirect } from 'next/navigation';
import Container from '@/components/container.component';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import ButtonLink from '@/components/button-link.component';

export default async function DashboardPage() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <Container>
      <div className="px-24">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-white font-bold">My Meetups</h1>
          <ButtonLink href="/events/create">
            <div className="inline-flex items-center gap-2 text-xl">
              <HiOutlinePlusCircle
                className="h-6 w-6 font-bold text-4xl"
                strokeWidth={2}
              />
              Create event
            </div>
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
