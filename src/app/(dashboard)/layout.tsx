import AuthProvider from '@/providers/auth-provider';
import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar.component';
import Loading from '@/app/(dashboard)/loading';

export const metadata: Metadata = {
  title: 'MeetHub',
  description: 'MeetHub Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="h-full">
        <body className="h-full bg-gradient-to-b from-[#26212F] to-[#3E2844]">
          <Navbar />
          {children}
          <Loading />
          {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
        </body>
      </html>
    </AuthProvider>
  );
}
