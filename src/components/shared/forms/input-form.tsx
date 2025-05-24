'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@root/components/ui/input';
import { RequiredSymbol } from '@root/components/shared/required-symbol';
import { ClearButton } from '@root/components/shared/clear-button';
import { ErrorText } from '@root/components/shared/error-text';
import { cn } from '@root/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      {label && (
        <p className='mb-2 font-medium'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input
          className={cn(
            'text-md h-10 rounded-sm dark:border-2 dark:border-[#1e293b] dark:bg-[#121212]',
            className
          )}
          {...register(name, { valueAsNumber: props.type === 'number' })}
          {...props}
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className='mt-2' />}
    </div>
  );
};
