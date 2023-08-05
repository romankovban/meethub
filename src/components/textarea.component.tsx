'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';

interface TextareaProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isEmpty?: boolean;
  textColor?: 'white' | 'gray';
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, isEmpty = false, textColor = 'gray', ...textareaProps }, ref) => {
    const textareaClasses = clsx('w-full border-0 rounded p-4 font-medium', {
      'bg-[#E8F0FE] outline-[#dfeafc]': isEmpty,
      'bg-[#2A2032] outline-[#282231]': !isEmpty,
      'text-gray-600': textColor === 'gray',
      'text-white': textColor === 'white',
    });
    return (
      <div className="mb-2">
        <textarea
          className={textareaClasses}
          ref={ref}
          rows={5}
          {...textareaProps}
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

export default Textarea;
