'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { TFormProfileSchema } from '@root/components/shared/auth-form/forms/schemas';
import { updateUserInfo } from '@root/app/profile/_actions/update-user';

export const useProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TFormProfileSchema) => {
    try {
      setIsLoading(true);

      const updatedData = {
        email: data.email,
        fullName: data.fullName,
        password: data.password || undefined, // Передаем пароль только если он был изменен
      };

      await updateUserInfo(updatedData);

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return {
    onSubmit,
    onClickSignOut,
    isLoading,
  };
};
