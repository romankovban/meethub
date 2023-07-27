'use server';

import { prisma } from '@/core/prisma';
import { hashPassword } from '@/utils/password';

interface CreateUserOption {
  fullName: string;
  email: string;
  password: string;
}

export const createUser = async (options: CreateUserOption) => {
  const passwordHash = await hashPassword(options.password);

  const { password, ...user } = await prisma.user.create({
    data: {
      fullName: options.fullName.replace(/\s+/g, ' '),
      email: options.email,
      password: passwordHash,
    },
  });

  return user;
};
