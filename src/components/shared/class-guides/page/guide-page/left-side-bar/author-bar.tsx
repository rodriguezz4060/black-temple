import { GuidePageProps } from '@root/@types/prisma';
import { ProfileAvatar } from '@root/components/shared/profile/profile-avatar';

interface AuthorBarProps {
  guide: GuidePageProps;
}

export const AuthorBar = ({ guide }: AuthorBarProps) => {
  return (
    <div className='border-dark-5 relative hidden justify-between gap-5 rounded-lg border lg:block lg:flex-col lg:justify-start dark:bg-[#171717]'>
      <div className='flex justify-between gap-5 px-3 pt-4 pb-3 lg:flex-col lg:justify-start'>
        <div className='flex gap-[10px]'>
          <div className='border-dark-1 z-[1] flex h-[52px] w-[52px] shrink-0 grow-0 items-center justify-center overflow-hidden rounded-full border-1'>
            <ProfileAvatar
              className='h-[50px] w-[50px]'
              fullName={guide.user.fullName}
              avatar={guide.user.avatar}
            />
          </div>
          <div className='flex items-center'>
            <span className='flex flex-col items-start gap-[2px]'>
              <span className='text-grey-1 font-sans text-sm leading-none font-light'>
                Автор
              </span>
              <span className='font-sans text-base leading-none font-bold'>
                {guide.user.fullName}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
