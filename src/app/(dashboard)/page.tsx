import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/next-auth.config';
import { redirect } from 'next/navigation';
import Container from '@/components/container.component';
import { HiOutlinePlusCircle, HiChevronRight } from 'react-icons/hi2';
import ButtonLink from '@/components/button-link.component';
import { getUserEvents } from '@/actions/event';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  const events = await getUserEvents(session.user.email!);

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
        <div className="flex flex-col mt-16 gap-5">
          {events.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={`event-${event.id}`}
              className="flex justify-between items-center bg-[#2A2032] border-0 rounded text-white text-xl font-medium px-6 py-5 cursor-pointer transition ease-in-out delay-50 hover:translate-x-1"
            >
              <h2>{event.title}</h2>
              <div className="inline-flex items-center gap-6">
                <p className="text-[#C6C1C7] text-base font-normal">
                  {DateTime.fromISO(event.date.toISOString())
                    .setLocale(Intl.DateTimeFormat().resolvedOptions().locale)
                    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
                    .toFormat('dd MMMM yyyy, HH:mm')}
                </p>
                <HiChevronRight
                  className="h-5 w-5 font-bold text-4xl"
                  strokeWidth={2}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
