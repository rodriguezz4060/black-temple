'use client';

import React from 'react';
import { User } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { formProfileSchema } from '@root/components/shared/auth-form/forms/schemas';
import { Container } from '@root/components/shared/container';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { Title } from '@root/components/ui/title';
import { useProfileForm } from '@root/components/hooks/profile/use-profile-form';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const { onSubmit, onClickSignOut } = useProfileForm();

  return (
    <Container className='my-10'>
      <Title
        text={`Профиль #${data.fullName}`}
        size='md'
        className='font-bold'
      />

      <FormProvider {...form}>
        <form
          className='mt-10 flex w-96 flex-col gap-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name='email' label='Email' required />
          <FormInput name='fullName' label='Никнейм' required />
          <FormInput type='password' name='password' label='Пароль' />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Подтверждение пароля'
          />
          <Button
            disabled={form.formState.isSubmitting}
            className='mt-5 text-base'
            type='submit'
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant='secondary'
            disabled={form.formState.isSubmitting}
            className='mb-5 text-base'
            type='button'
          >
            Выйти из аккаунта
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
