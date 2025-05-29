'use client';

import * as React from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formProfileSchema } from '@root/components/shared/auth-form/forms/schemas';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { useProfileForm } from '@root/components/hooks/profile/use-profile-form';
import { User } from '@prisma/client';
import { Textarea } from '@root/components/ui/textarea';
import { Label } from '@root/components/ui/label';
import { ProfileAvatar } from '../profile-avatar';

interface SettingsProps {
  data: User;
}

export default function ProfileSettingsPage({ data }: SettingsProps) {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      avatar: data.avatar ?? '',
      bio: data.bio ?? '',
      password: '',
      confirmPassword: '',
    },
  });

  const { onSubmit, onUpdate, onClickSignOut, isAvatarLoading } =
    useProfileForm();

  return (
    <>
      <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
        <FormProvider {...form}>
          <form
            className='mt-2 flex w-90 flex-col gap-2 lg:ml-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='relative flex gap-4'>
              <ProfileAvatar
                fullName={data.fullName}
                avatar={data.avatar}
                className='h-20 w-20'
              />

              <FormInput name='avatar' label='Аватар' />
              <Button
                onClick={form.handleSubmit(onUpdate)}
                className='mb-2.5 self-end'
                disabled={isAvatarLoading}
              >
                Изменить
              </Button>
            </div>
            <FormInput name='fullName' label='Никнейм' required />
            <div>
              <Label htmlFor='bio' className='mb-1 text-[15px]'>
                О себе
              </Label>
              <Controller
                name='bio'
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder='Расскажите о себе'
                    className='min-h-[100px]'
                  />
                )}
              />
            </div>
            <FormInput name='email' label='Email' required />
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
      </div>
    </>
  );
}
