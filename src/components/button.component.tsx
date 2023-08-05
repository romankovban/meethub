'use client';

import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.ComponentProps<'button'>['onClick'];
  type?: React.ComponentProps<'button'>['type'];
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export default function Button({
  fullWidth = false,
  color = 'primary',
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const buttonClasses = clsx('text-white font-bold rounded px-4 py-3', {
    'w-full': fullWidth,
    'bg-[#D44059] outline-[#d43a54]': color === 'primary',
    'bg-[#4DBAFA] outline-[#42b8fd]': color === 'secondary',
  });

  return <button className={buttonClasses} type={type} {...buttonProps} />;
}
