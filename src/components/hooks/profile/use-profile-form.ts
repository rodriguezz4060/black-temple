'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { TFormProfileSchema } from '@root/components/shared/auth-form/forms/schemas';
import { updateUserInfo } from '@root/app/profile/_actions/update-user';
import { updateUserAvatar } from '@root/app/profile/_actions/update-avatar';

export const useProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const { update } = useSession();

  const onSubmit = async (data: TFormProfileSchema) => {
    try {
      setIsLoading(true);
      const updatedData = {
        email: data.email,
        fullName: data.fullName,
        bio: data.bio,
        password: data.password || undefined,
      };
      await updateUserInfo(updatedData);

      toast.success('Данные обновлены 📝', { icon: '✅' });
    } catch {
      toast.error('Ошибка при обновлении данных', { icon: '❌' });
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (data: TFormProfileSchema) => {
    try {
      setIsAvatarLoading(true);
      const updatedData = {
        avatar: data.avatar || undefined,
      };

      await updateUserAvatar(updatedData);
      await update(); // Обновляем сессию после изменения аватара

      toast.success('Аватар обновлен 📝', { icon: '✅' });
    } catch {
      toast.error('Ошибка при обновлении аватара', { icon: '❌' });
    } finally {
      setIsAvatarLoading(false);
    }
  };

  const onClickSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return {
    onSubmit,
    onUpdate,
    onClickSignOut,
    isLoading,
    isAvatarLoading,
  };
};
