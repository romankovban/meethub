import SignInForm from '@/components/sign-in-form.component';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 mx-auto">
        <div className="mb-12">
          <Image
            src="/logo.svg"
            width={42}
            height={42}
            alt="logo MeetHub"
            className="mx-auto"
          />
        </div>
        <SignInForm />
        <div className="mt-4 text-center">
          <Link
            className="text-[#C6C1C7] hover:underline hover:text-white transition-all duration-200"
            href="/sign-up"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
