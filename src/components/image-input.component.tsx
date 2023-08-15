'use client';
import Image from 'next/image';
import Button from '@/components/button.component';
import useForwardRef from '@/hooks/use-forwarded-ref.hook';
import { forwardRef, useState } from 'react';

interface ImageInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ error, disabled, ...inputProps }, ref) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const inputRef = useForwardRef<HTMLInputElement>(ref);

    const handleButtonClick = () => {
      inputRef.current.click();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputProps.onChange(e);

      const file = e.target.files?.[0];
      if (!file) {
        setImageUrl(null);
        return;
      }
      setImageUrl(URL.createObjectURL(file));
    };

    return (
      <div className="mb-3">
        {imageUrl && (
          <div className="w-full h-80 relative mb-3">
            <Image
              src={imageUrl}
              loading="lazy"
              fill
              alt="banner"
              className="object-cover"
            />
          </div>
        )}
        <input
          className="w-full border-0 rounded p-4 font-medium hidden"
          {...inputProps}
          type="file"
          accept="image/*"
          onChange={handleOnChange}
          ref={inputRef}
        />
        <Button onClick={handleButtonClick} disabled={disabled}>
          Upload image
        </Button>
        {error && (
          <div role="alert" className="text-[#F94D6A]">
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default ImageInput;
