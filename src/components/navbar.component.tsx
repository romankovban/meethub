'use client';

import Logo from '@/components/logo.component';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-[#18161F]">
      <div className="container mx-auto py-8 flex justify-between">
        <Logo />
        {status === 'loading' && <div className="text-white">Loading...</div>}
        {status === 'authenticated' && (
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <div className="text-xl text-white font-bold">
                {session.user?.email}
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
            <button
              className="bg-[#D44059] text-white font-bold rounded px-4 py-3"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
