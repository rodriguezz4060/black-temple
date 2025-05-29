'use client';

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { User } from '@prisma/client';
import { addSocialLinkSchema } from '../schemas/social-page-schemas';
import { useProfileSocialForm } from '@root/components/hooks/profile/use-social-form';
import { Loader2, Trash2 } from 'lucide-react';
import { cn } from '@root/lib/utils';

interface SettingsProps {
  data: User;
}

export default function ProfileSettingsSocial({ data }: SettingsProps) {
  const form = useForm({
    resolver: zodResolver(addSocialLinkSchema),
    defaultValues: {
      battleTag: data.battleTag ?? '',
      discord: data.discord ?? '',
      discordServer: data.discordServer ?? '',
      twitch: data.twitch ?? '',
      youtube: data.youtube ?? '',
      website: data.website ?? '',
      telegram: data.telegram ?? '',
      twitter: data.twitter ?? '',
      patreon: data.patreon ?? '',
      boosty: data.boosty ?? '',
    },
  });

  const { onSubmit, onSingleFieldSubmit, onDeleteField, loadingFields } =
    useProfileSocialForm(form);

  const socialFields = [
    { name: 'battleTag', label: 'BattleTag' },
    { name: 'discord', label: 'Discord' },
    { name: 'discordServer', label: 'Discord' },
    { name: 'twitch', label: 'Twitch' },
    { name: 'youtube', label: 'Youtube' },
    { name: 'website', label: 'Ваш сайт' },
    { name: 'telegram', label: 'Telegram' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'patreon', label: 'Patreon' },
    { name: 'boosty', label: 'Boosty' },
  ];

  return (
    <>
      <div className='flex flex-1 flex-col gap-2 overflow-y-auto p-4 pt-0'>
        <FormProvider {...form}>
          <form
            className='mt-2 flex w-full max-w-md flex-col gap-3 lg:ml-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {socialFields.map(field => {
              const fieldValue = form.watch(
                field.name as keyof typeof form.formState.defaultValues
              );
              const isFieldDirty =
                form.formState.dirtyFields[
                  field.name as keyof typeof form.formState.dirtyFields
                ];
              const isFieldFilled =
                !!data[field.name as keyof User] && !isFieldDirty;

              const hasError =
                !!form.formState.errors[
                  field.name as keyof typeof form.formState.errors
                ];

              return (
                <div key={field.name} className='flex items-end gap-2'>
                  <div className='flex w-full items-end gap-2'>
                    <div className='flex-1'>
                      <FormInput name={field.name} label={field.label} />
                    </div>
                    {isFieldFilled ? (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => onDeleteField(field.name)}
                        disabled={loadingFields[field.name]}
                        className={cn('my-0.5 h-9 w-9', {
                          '-translate-y-7': hasError,
                        })}
                      >
                        {loadingFields[field.name] ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <Trash2 className='h-4 w-4 text-red-500' />
                        )}
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() =>
                          form.handleSubmit(data =>
                            onSingleFieldSubmit(field.name, data)
                          )()
                        }
                        disabled={
                          loadingFields[field.name] ||
                          (!isFieldDirty && !fieldValue)
                        }
                        className={cn('my-0.5 h-9 w-9', {
                          '-translate-y-7': hasError,
                        })}
                      >
                        {loadingFields[field.name] ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          '💾'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
              className='mt-5 text-base'
              type='submit'
            >
              Сохранить все
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
