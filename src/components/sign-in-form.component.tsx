'use client';

import Input from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off">
      <Input
        placeholder="Your email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        placeholder="Your password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <button
        className="bg-[#F94D6A] w-full border-0 rounded p-3 mt-2 text-white font-bold"
        type="submit"
      >
        {isSubmitting ? 'Loading...' : 'Get access'}
      </button>
    </form>
  );
}
