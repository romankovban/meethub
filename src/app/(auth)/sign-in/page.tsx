import Link from 'next/link';
import SignInForm from '@/components/sign-in-form.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/next-auth.config';
import { redirect } from 'next/navigation';
import Logo from '@/components/logo.component';

export default async function SignInPage() {
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
        <SignInForm />
        <div className="mt-4 text-center">
          <Link
            className="text-[#C6C1C7] hover:underline hover:text-white transition-all duration-200"
            href="/sign-up"
          >
            Don't have an account yet? Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
