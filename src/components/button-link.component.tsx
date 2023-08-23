'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export default function ButtonLink({
  children,
  href,
  color = 'primary',
  fullWidth = false,
}: ButtonLinkProps) {
  const buttonLinkClasses = clsx(
    'text-white font-bold border-0 rounded px-4 py-2',
    {
      'w-full': fullWidth,
      'bg-[#D44059]': color === 'primary',
      'bg-[#4DBAFA]': color === 'secondary',
    }
  );

  return (
    <Link href={href} className={buttonLinkClasses}>
      {children}
    </Link>
  );
}
