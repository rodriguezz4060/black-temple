'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginSchema } from './schemas';
import toast from 'react-hot-toast';
import { Button } from '@root/components/ui/button';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Title } from '@root/components/ui/title';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onClose?: VoidFunction;
  setType: React.Dispatch<React.SetStateAction<'login' | 'email' | 'register'>>;
}

export const EmailForm: React.FC<Props> = ({ setType, onClose }) => {
  const form = useForm<TFormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: TFormLoginSchema) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы вошли в аккаунт', {
        icon: '✅',
      });
      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-[85%] items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <span
              className='cursor-pointer text-blue-600 hover:text-blue-700'
              onClick={() => setType('login')}
            >
              <ArrowLeft />
            </span>
            <div className='mr-2'>
              <Title text='Вход' size='md' className='font-bold' />
            </div>
          </div>
        </div>

        <FormInput
          name='email'
          label='Email'
          placeholder='user@gmail.com'
          required
        />
        <FormInput
          name='password'
          label='Пароль'
          type='password'
          placeholder='********'
          required
        />

        <Button
          variant='blue'
          loading={form.formState.isSubmitting}
          className='bg-secondary flex cursor-pointer items-center gap-2 text-sm font-bold'
          type='submit'
        >
          Войти
        </Button>
        <p className='text-center text-gray-400'>
          Нет аккаунта?{' '}
          <span
            className='cursor-pointer text-blue-600 hover:text-blue-700'
            onClick={() => setType('register')}
          >
            Зарегистрироваться
          </span>
        </p>
      </form>
    </FormProvider>
  );
};
