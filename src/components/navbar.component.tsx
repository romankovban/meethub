'use client';

import Button from '@/components/button.component';
import Logo from '@/components/logo.component';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  const logout = () => {
    signOut({
      callbackUrl: '/sign-in',
    });
  };

  return (
    <div className="bg-[#18161F] mb-12">
      <div className="container mx-auto py-6 flex justify-between">
        <Link href="/">
          <Logo />
        </Link>
        {status === 'loading' && <div className="text-white">Loading...</div>}
        {status === 'authenticated' && (
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <div className="text-xl text-white font-bold">
                {session.user?.name}
              </div>
              <div className="text-end">
                <Link
                  className="text-sm text-[#C6C1C7] hover:underline hover:text-white transition-all duration-200"
                  href="/profile"
                >
                  My profile
                </Link>
              </div>
            </div>
            <Button onClick={logout}>Sign out</Button>
          </div>
        )}
      </div>
    </div>
  );
}
