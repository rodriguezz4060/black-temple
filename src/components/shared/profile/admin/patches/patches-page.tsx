'use client';

import { ExpansionProps } from '@root/@types/prisma';
import { usePatchManager } from '@root/components/hooks/admin-panel/patch-manager/use-patch-manager';
import AddPatchForm from './add-patch-form';
import PatchTable from './patches-table';
import EditPatchForm from './edit-patch-form';

// Клиентский компонент
interface PatchesClientProps {
  initialExpansions: ExpansionProps[];
  currentPatch: string;
}

export default function PatchesClient({
  initialExpansions,
  currentPatch,
}: PatchesClientProps) {
  const {
    expansions,
    isDeleting,
    editingPatch,
    addForm,
    editForm,
    handleAddPatch,
    handleDeletePatch,
    handleEditPatch,
    handleEditSubmit,
    setEditingPatch,
  } = usePatchManager(initialExpansions, currentPatch);

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[40%_60%]'>
        <AddPatchForm
          form={addForm}
          onSubmit={handleAddPatch}
          currentPatch={currentPatch}
        />

        <PatchTable
          expansions={expansions}
          isDeleting={isDeleting}
          onEdit={handleEditPatch}
          onDelete={handleDeletePatch}
          isSubmitting={
            addForm.formState.isSubmitting || editForm.formState.isSubmitting
          }
        />
      </div>

      <EditPatchForm
        editingPatch={editingPatch}
        form={editForm}
        onSubmit={handleEditSubmit}
        onClose={() => setEditingPatch(null)}
        currentPatch={currentPatch}
      />
    </div>
  );
}
