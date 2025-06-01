import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@root/components/ui/select';
import { cn } from '@root/lib/utils';
import toast from 'react-hot-toast';
import { updateGuideStatus } from '@root/app/class-guides/_actions/update-guide-status';
import { useState, useTransition } from 'react';
import { GuidePageProps } from '@root/@types/prisma';

interface GuideStatusProps {
  guide: GuidePageProps;
}

enum GuideStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export const GuideStatusComponent = ({ guide }: GuideStatusProps) => {
  const [isPending, startTransition] = useTransition();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<GuideStatus>(
    guide.status as GuideStatus
  );

  const handleStatusChange = (newStatus: GuideStatus) => {
    if (newStatus === guide.status) {
      toast.error(`Гайд уже находится в статусе: ${newStatus}`);
      return;
    }

    setIsUpdating(true);
    startTransition(async () => {
      try {
        const result = await updateGuideStatus(guide.id, newStatus);
        toast.success(result.message);
        setSelectedStatus(newStatus);
      } catch {
        toast.error(`Ошибка при изменении статуса`);
      } finally {
        setIsUpdating(false);
      }
    });
  };

  const statusOptions = Object.values(GuideStatus).map(status => ({
    value: status,
    label:
      status === GuideStatus.DRAFT
        ? 'Черновик'
        : status === GuideStatus.PUBLISHED
          ? 'Опубликовать'
          : 'Архивировать',
  }));
  return (
    <>
      <Select
        value={selectedStatus}
        onValueChange={handleStatusChange}
        disabled={isUpdating || isPending}
      >
        <SelectTrigger
          aria-label='Изменить статус гайда'
          className={cn(
            'bo cursor-pointer border-2! text-white [&_svg]:text-white! [&_svg]:opacity-50! hover:[&_svg]:opacity-100!',
            selectedStatus === GuideStatus.DRAFT &&
              'bg-blue-600! hover:bg-blue-700!',
            selectedStatus === GuideStatus.PUBLISHED &&
              'bg-green-600! hover:bg-green-700!',
            selectedStatus === GuideStatus.ARCHIVED &&
              'bg-gray-600! hover:bg-gray-700!'
          )}
        >
          <SelectValue>
            {isUpdating || isPending
              ? 'Обновление...'
              : statusOptions.find(option => option.value === selectedStatus)
                  ?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-dark-800! rounded-sm'>
          {statusOptions.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              className='cursor-pointer'
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
