'use client';

import Input from '@/components/input.component';
import { authOptions } from '@/core/next-auth.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/button.component';
import Textarea from '@/components/textarea.component';
import ImageInput from '@/components/image-input.component';
import { toBase64 } from '@/utils/files';
import { createEvent } from '@/actions/event';

const createEventSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(2000),
  date: z.string(),
  banner: z.any(),
  localization: z.string().min(3).max(500),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const fileBase64 = await toBase64(data.banner[0]);

    await createEvent({
      ...data,
      banner: fileBase64,
      date: new Date(data.date),
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <ImageInput
        {...register('banner')}
        error={errors.banner?.message as string}
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
      <Button type="submit">Create event</Button>
    </form>
  );
}
