'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormRegisterSchema, formRegisterSchema } from './schemas';
import toast from 'react-hot-toast';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { registerUser } from '@root/app/profile/_actions/create-user';

interface Props {
  onClose?: VoidFunction;
  setType: React.Dispatch<React.SetStateAction<'login' | 'email' | 'register'>>;
}

export const RegisterForm: React.FC<Props> = ({ setType, onClose }) => {
  const form = useForm<TFormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterSchema) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Регистрация успешна 📝.', {
        icon: '✅',
      });

      onClose?.();
    } catch {
      return toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex w-[80%] flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className='text-center text-xl font-bold'>Регистрация</p>

        <FormInput
          name='email'
          label='Email'
          placeholder='user@gmail.com'
          required
        />
        <FormInput
          name='fullName'
          label='Никнейм'
          placeholder='RodriguezDB'
          required
        />
        <FormInput
          name='password'
          label='Пароль'
          type='password'
          placeholder='********'
          required
        />
        <FormInput
          name='confirmPassword'
          label='Подтвердите пароль'
          type='password'
          placeholder='********'
          required
        />

        <Button
          variant='blue'
          loading={form.formState.isSubmitting}
          className='bg-secondary flex items-center gap-2 text-sm font-bold'
          type='submit'
        >
          Зарегистрироваться
        </Button>
        <p className='text-center text-gray-400'>
          Уже есть аккаунт?{' '}
          <span
            className='cursor-pointer text-blue-600 hover:text-blue-700'
            onClick={() => setType('login')}
          >
            Войти
          </span>
        </p>
      </form>
    </FormProvider>
  );
};
