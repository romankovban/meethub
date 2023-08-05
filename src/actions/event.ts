'use server';

import { getUserByEmail } from '@/actions/user';
import { prisma } from '@/core/prisma';
import { getServerSession } from 'next-auth';

interface CreateEventOptions {
  title: string;
  description: string;
  date: Date;
  banner: string;
  localization: string;
}

export const createEvent = async (options: CreateEventOptions) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error('You must be logged in to create an event');
  }

  const user = await getUserByEmail(session.user.email!);

  if (!user) {
    throw new Error('User not found');
  }
  const event = await prisma.event.create({
    data: {
      title: options.title,
      description: options.description,
      date: options.date,
      banner: options.banner,
      localization: options.localization,
      user_id: user.id,
    },
  });

  return event;
};
