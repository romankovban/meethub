'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  color?: 'primary' | 'secondary';
}

export default function ButtonLink({
  children,
  href,
  color = 'primary',
}: ButtonLinkProps) {
  const buttonLinkClasses = clsx(
    'text-white font-bold border-0 rounded px-4 py-2',
    {
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
