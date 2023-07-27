'use client';

import Input from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const {
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
    register,
    getValues,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });
  });

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off">
      <Input
        placeholder="Your email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        isEmpty={getValues('email').length > 0 ? true : false}
      />
      <Input
        placeholder="Your password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        isEmpty={getValues('password').length > 0 ? true : false}
      />
      <button
        className="bg-[#F94D6A] w-full border-0 rounded p-3 mt-2 text-white font-bold"
        type="submit"
      >
        {isSubmitting ? 'Loading...' : 'Sign in'}
      </button>
    </form>
  );
}
