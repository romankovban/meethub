'use client';

import Input from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/button.component';
import Textarea from '@/components/textarea.component';
import ImageInput from '@/components/image-input.component';
import { toBase64 } from '@/utils/files';
import { createEvent, updateEvent } from '@/actions/event';
import useRendered from '@/hooks/use-rendered.hook';

const eventSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(2000),
  date: z.string(),
  banner: z.any(),
  localization: z.string().min(3).max(500),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  defaultValues?: EventFormValues;
  isUpdate?: boolean;
}

export default function EventForm({
  defaultValues,
  isUpdate,
}: EventFormProps = {}) {
  const isRendered = useRendered();
  const router = useRouter();
  const params = useParams();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<EventFormValues>({
    defaultValues: defaultValues ? { ...defaultValues } : {},
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!data.banner) {
      setError('banner', { message: 'Please upload banner' });
      return;
    }

    if (isUpdate) {
      if (typeof data.banner !== 'string') {
        data.banner = await toBase64(data.banner[0]);
      }

      await updateEvent({
        ...data,
        date: new Date(data.date),
        banner: data.banner,
        id: params.id as string,
      });

      router.replace(`/events/${params.id}`);
    } else {
      const fileBase64 = await toBase64(data.banner[0]);

      await createEvent({
        ...data,
        banner: fileBase64,
        date: new Date(data.date),
      });

      router.replace('/');
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <ImageInput
        {...register('banner')}
        disabled={!isRendered}
        error={errors.banner?.message as string}
        defaultImage={defaultValues?.banner}
      />
      <Input
        {...register('title')}
        placeholder="Event title"
        textColor="white"
        error={errors.title?.message}
      />
      <Textarea
        {...register('description')}
        placeholder="Event description"
        textColor="white"
        error={errors.description?.message}
      />

      <Input
        {...register('date')}
        type="datetime-local"
        placeholder="Event date"
        textColor="white"
        error={errors.date?.message}
      />

      <Input
        {...register('localization')}
        placeholder="Event location"
        textColor="white"
        error={errors.localization?.message}
      />
      <div className="text-end">
        <Button type="submit" disabled={!isRendered || isSubmitting}>
          {isUpdate ? 'Update event' : 'Create event'}
        </Button>
      </div>
    </form>
  );
}
