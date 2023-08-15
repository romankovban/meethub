'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty?: boolean;
  textColor?: 'white' | 'gray';
  type?: React.ComponentProps<'input'>['type'];
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, isEmpty, textColor = 'gray', type = 'text', ...inputProps },
    ref
  ) => {
    const inputClasses = clsx('w-full border-0 rounded p-4 font-medium', {
      'bg-[#E8F0FE] outline-[#dfeafc]': isEmpty,
      'bg-[#2A2032] outline-[#282231]': !isEmpty,
      'text-gray-600': textColor === 'gray',
      'text-white': textColor === 'white',
    });
    return (
      <div className="mb-3">
        <input
          className={inputClasses}
          type={type}
          ref={ref}
          {...inputProps}
          autoComplete={type === 'password' ? 'off' : 'on'}
        />
        {error && (
          <div role="alert" className="text-[#F94D6A]">
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
