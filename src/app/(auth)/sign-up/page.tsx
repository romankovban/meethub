import SignUpForm from '@/components/sign-up-form.component';
import { authOptions } from '@/core/next-auth.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/logo.component';

export default async function SignUpPage() {
  const user = await getServerSession(authOptions);

  if (user) {
    redirect('/');
  }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 mx-auto">
        <div className="mb-12">
          <Logo className="mx-auto" />
        </div>
        <SignUpForm />
        <div className="mt-4 text-center">
          <Link
            className="text-[#C6C1C7] hover:underline hover:text-white transition-all duration-200"
            href="/sign-in"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
