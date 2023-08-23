'use client';

import { useParams, useRouter } from 'next/navigation';
import { deleteEvent } from '@/actions/event';
import Button from '@/components/button.component';
import { HiArchiveBoxXMark } from 'react-icons/hi2';

export default function DeleteEvent() {
  const router = useRouter();
  const params = useParams();

  const handleDelete = async () => {
    if (confirm('Are you sure want to delete this event?')) {
      await deleteEvent(params.id as string);
      router.push('/');
    }
  };
  return (
    <Button fullWidth onClick={handleDelete}>
      <HiArchiveBoxXMark className="inline mr-2" />
      Delete
    </Button>
  );
}
