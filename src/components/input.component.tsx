'use client';

import { forwardRef } from 'react';

interface InputProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.ComponentProps<'input'>['type'];
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, type = 'text', ...inputProps }, ref) => {
    return (
      <div className="mb-3">
        <input
          className="w-full border-0 rounded p-3 font-medium text-gray-600 outline-[#282231]"
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
