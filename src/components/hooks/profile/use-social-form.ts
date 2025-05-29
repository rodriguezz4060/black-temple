'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { TAddSocialLinkSchema } from '@root/components/shared/profile/settings/schemas/social-page-schemas';
import { updateSocialInfo } from '@root/app/profile/_actions/update-social';
import { UseFormReturn } from 'react-hook-form';

export const useProfileSocialForm = (
  form: UseFormReturn<TAddSocialLinkSchema>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState<Record<string, boolean>>(
    {}
  );

  const onSubmit = async (data: TAddSocialLinkSchema) => {
    try {
      setIsLoading(true);

      const updatedData = {
        battleTag: data.battleTag,
        discord: data.discord,
        discordServer: data.discordServer,
        twitch: data.twitch,
        youtube: data.youtube,
        website: data.website,
        telegram: data.telegram,
        twitter: data.twitter,
        patreon: data.patreon,
        boosty: data.boosty,
      };

      await updateSocialInfo(updatedData);

      toast.success('Все данные обновлены 📝', {
        icon: '✅',
      });
      form.reset(data);
    } catch {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSingleFieldSubmit = async (
    fieldName: string,
    data: TAddSocialLinkSchema
  ) => {
    try {
      setLoadingFields(prev => ({ ...prev, [fieldName]: true }));

      const updatedData = {
        [fieldName]: data[fieldName as keyof TAddSocialLinkSchema],
      };

      await updateSocialInfo(updatedData);

      toast.success(
        `${fieldName} обновлен: ${data[fieldName as keyof TAddSocialLinkSchema]} 📝`,
        {
          icon: '✅',
        }
      );
      form.resetField(fieldName as keyof TAddSocialLinkSchema, {
        defaultValue: data[fieldName as keyof TAddSocialLinkSchema],
      });
    } catch {
      return toast.error(`Ошибка при обновлении ${fieldName}`, {
        icon: '❌',
      });
    } finally {
      setLoadingFields(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const onDeleteField = async (fieldName: string) => {
    try {
      setLoadingFields(prev => ({ ...prev, [fieldName]: true }));

      const updatedData = {
        [fieldName]: '',
      };

      await updateSocialInfo(updatedData);

      toast.success(`${fieldName} удален 🗑️`, {
        icon: '✅',
      });
      form.resetField(fieldName as keyof TAddSocialLinkSchema, {
        defaultValue: '',
      });
    } catch {
      return toast.error(`Ошибка при удалении ${fieldName}`, {
        icon: '❌',
      });
    } finally {
      setLoadingFields(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const resetField = (fieldName: string) => {
    form.resetField(fieldName as keyof TAddSocialLinkSchema, {
      defaultValue: '',
    });
  };

  return {
    onSubmit,
    onSingleFieldSubmit,
    onDeleteField,
    resetField,
    isLoading,
    loadingFields,
  };
};
