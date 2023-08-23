'use server';

import { getUserFromSession } from '@/actions/auth';
import { prisma } from '@/core/prisma';

interface CreateEventOptions {
  title: string;
  description: string;
  date: Date;
  banner: string;
  localization: string;
}

export const createEvent = async (options: CreateEventOptions) => {
  const user = await getUserFromSession();

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

export const getAllEvents = () => {
  return prisma.event.findMany();
};

export const getUserEvents = (email: string) => {
  return prisma.event.findMany({
    where: {
      user: {
        email,
      },
    },
  });
};

export const getEventById = (id: string) => {
  return prisma.event.findUnique({
    where: {
      id,
    },
  });
};
