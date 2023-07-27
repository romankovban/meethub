'use client';

import { createUser } from '@/actions/user';
import Button from '@/components/button.component';
import Input from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z.object({
  fullName: z.string().min(6).max(32),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const {
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
    register,
    getValues,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await createUser(data);
  });

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off">
      <Input
        placeholder="Your full name"
        {...register('fullName')}
        error={errors.fullName?.message}
        isEmpty={getValues('fullName').length > 0 ? true : false}
      />
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
      <Button type="submit" fullWidth>
        {isSubmitting ? 'Loading...' : 'Register'}
      </Button>
    </form>
  );
}
