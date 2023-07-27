import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MeetHub',
  description: 'MeetHub application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gradient-to-b from-[#26212F] to-[#3E2844]">
        {children}
      </body>
    </html>
  );
}