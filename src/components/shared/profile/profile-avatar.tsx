'use client';

import { useProfileForm } from '@root/components/hooks/profile/use-profile-form';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@root/components/ui/avatar';
import { cn } from '@root/lib/utils';
import { Loader2 } from 'lucide-react';

interface ProfileAvatarProps {
  fullName: string;
  avatar: string | null;
  className?: string;
}

export const ProfileAvatar = ({
  fullName,
  avatar,
  className,
}: ProfileAvatarProps) => {
  const { isAvatarLoading } = useProfileForm();

  return (
    <div>
      <Avatar className={cn('h-18 w-18', className)}>
        <AvatarImage src={avatar ?? ''} />
        <AvatarFallback className={cn('text-[36px] font-bold', className)}>
          {fullName?.trim() ? fullName.trim().charAt(0).toUpperCase() : 'U'}
        </AvatarFallback>
        {isAvatarLoading && (
          <div className='bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        )}
      </Avatar>
    </div>
  );
};
