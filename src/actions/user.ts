'use server';

import { prisma } from '@/core/prisma';
import { hashPassword } from '@/utils/password';

interface CreateUserOptions {
  fullName: string;
  email: string;
  password: string;
}

export const createUser = async (options: CreateUserOptions) => {
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

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
