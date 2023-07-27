'use client';

import clsx from 'clsx';
import { forwardRef, useRef, useState } from 'react';

interface InputProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty?: boolean;
  type?: React.ComponentProps<'input'>['type'];
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, isEmpty, type = 'text', ...inputProps }, ref) => {
    const inputClasses = clsx(
      'w-full border-0 rounded p-3 font-medium text-gray-600 outline-[#282231]',
      {
        'bg-white': isEmpty,
        'bg-[#2A2032]': !isEmpty,
      }
    );
    return (
      <div className="mb-3">
        <input
          className={inputClasses}
          type={type}
          ref={ref}
          {...inputProps}
          autoComplete={type === 'password' ? 'off' : 'on'}
        />
        {error && <div className="text-[#F94D6A]">{error}</div>}
      </div>
    );
  }
);

export default Input;
