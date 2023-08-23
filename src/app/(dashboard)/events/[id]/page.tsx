import { getEventById } from '@/actions/event';
import Button from '@/components/button.component';
import Container from '@/components/container.component';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArchiveBoxXMark, HiPencilSquare } from 'react-icons/hi2';

interface EventPageParams {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageParams) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-white text-4xl font-medium">{event.title}</h1>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Link href={`/events/${event.id}/edit`}>
              <Button color="secondary" fullWidth>
                <HiPencilSquare className="inline mr-2" /> Edit
              </Button>
            </Link>
          </div>
          <div className="w-48">
            <Link href={`/events/${event.id}/delete`}>
              <Button fullWidth>
                <HiArchiveBoxXMark className="inline mr-2" />
                Delete
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-96 relative mb-8">
        <Image
          src={event.banner}
          loading="lazy"
          fill
          alt="banner"
          className="object-cover rounded"
        />
      </div>
      <div className="text-white">
        <h2 className="text-2xl">Details</h2>
        <p>{event.description}</p>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-500" />
      <div className="text-white">
        <h2 className="text-2xl">Location</h2>
        <p>{event.localization}</p>
        <p>
          {DateTime.fromISO(event.date.toISOString())
            .setLocale(Intl.DateTimeFormat().resolvedOptions().locale)
            .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
            .toFormat('dd MMMM yyyy, HH:mm')}
        </p>
      </div>
    </Container>
  );
}
