'use client';

import { useState } from 'react';
import { Card, CardContent } from '@root/components/ui/card';
import { Button } from '@root/components/ui/button';
import { Save } from 'lucide-react';
import { MDTabContentEditor } from './md-tab-content-editor';
import toast from 'react-hot-toast';

interface TextFieldEditorProps {
  textField: { id: number; content: string };
  sectionId: number;
  guideId: number;
}

export const TextFieldEditor: React.FC<TextFieldEditorProps> = ({
  textField,
  sectionId,
  guideId,
}) => {
  const [content, setContent] = useState(textField.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/text-field', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: textField.id, content, sectionId, guideId }),
      });

      if (!response.ok) throw new Error('Failed to save text field');
      toast.success('Текстовый блок сохранен успешно');
    } catch (error) {
      console.error('Error saving text field:', error);
      toast.error('Не удалось сохранить текстовый блок');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className='rounded-none border-none'>
      <CardContent className='space-y-2 p-0'>
        <MDTabContentEditor
          className='px-2'
          content={content}
          onContentChange={setContent}
        />
        <div className='mt-4 flex justify-end'>
          <Button
            onClick={handleSave}
            loading={isSaving}
            className='min-w-[100px]'
          >
            <Save className='mr-2 h-4 w-4' />
            Сохранить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
