'use client';

import { Title } from '@root/components/ui/title';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@root/components/ui/table';
import { Button } from '@root/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { TooltipWrapper } from '@root/components/shared/wrapper';
import { Expansion } from '@prisma/client';

interface PatchTableProps {
  expansions: Expansion[];
  isDeleting: number | null;
  onEdit: (patch: Expansion) => void;
  onDelete: (id: number) => void;

  isSubmitting: boolean;
}

export default function PatchTable({
  expansions,
  isDeleting,
  onEdit,
  onDelete,

  isSubmitting,
}: PatchTableProps) {
  return (
    <div className='bg-muted/50 h-[calc(100dvh-200px)] overflow-y-auto rounded-md p-5'>
      <Title className='mb-4 text-2xl font-bold' text='База патчей WoW' />
      <Table>
        <TableCaption>
          {isSubmitting || isDeleting
            ? 'Обновление данных...'
            : 'База патчей WoW'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Аддон</TableHead>
            <TableHead>Сезон</TableHead>
            <TableHead>Версия</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expansions.length > 0 ? (
            expansions.map(expansion => (
              <TableRow key={expansion.id}>
                <TableCell className='font-medium'>{expansion.name}</TableCell>
                <TableCell>{expansion.patchName}</TableCell>
                <TableCell>{expansion.patchVersion}</TableCell>

                <TableCell className='flex justify-end gap-2 text-right'>
                  <Button
                    size='icon'
                    onClick={() => onEdit(expansion)}
                    disabled={isDeleting === expansion.id}
                  >
                    <TooltipWrapper content='Редактировать'>
                      <SquarePen />
                    </TooltipWrapper>
                  </Button>
                  <Button
                    variant='destructive'
                    size='icon'
                    onClick={() => onDelete(expansion.id)}
                    disabled={isDeleting === expansion.id}
                    loading={isDeleting === expansion.id}
                  >
                    <TooltipWrapper content='Удалить'>
                      <Trash2 className='text-white' />
                    </TooltipWrapper>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='py-4 text-center'>
                Нет данных о патчах. Добавьте первый патч используя форму слева.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
