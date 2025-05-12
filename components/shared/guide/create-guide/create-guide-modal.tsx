// app/components/CreateGuideModal.tsx
'use client';

import { createGuide, getClasses } from '@/app/guide';
import Image from 'next/image';
import { useState } from 'react';

export default function CreateGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState<
    Awaited<ReturnType<typeof getClasses>>
  >([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);
  const [patch, setPatch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async () => {
    setIsLoading(true);
    try {
      const classesData = await getClasses();
      setClasses(classesData);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !patch) return;

    setIsLoading(true);
    try {
      await createGuide({
        classId: selectedClass,
        specializationId: selectedSpec || undefined,
        patch,
      });
      setIsOpen(false);
      // Сброс формы
      setSelectedClass(null);
      setSelectedSpec(null);
      setPatch('');
    } catch (error) {
      console.error('Error creating guide:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClassData = classes.find((c) => c.id === selectedClass);

  return (
    <>
      <button
        onClick={openModal}
        disabled={isLoading}
        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
      >
        {isLoading ? 'Загрузка...' : 'Создать гайд'}
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Создание нового гайда</h2>

            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block mb-2 font-medium'>
                  Выберите класс:
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      type='button'
                      onClick={() => setSelectedClass(cls.id)}
                      className={`p-2 border rounded flex flex-col items-center ${
                        selectedClass === cls.id
                          ? 'bg-blue-100 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Image
                        src={cls.classIcon}
                        alt={cls.name}
                        className='w-8 h-8 mb-1'
                      />
                      <span>{cls.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedClass && (
                <div className='mb-4'>
                  <label className='block mb-2 font-medium'>
                    Выберите специализацию (опционально):
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    {selectedClassData?.specializations.map((spec) => (
                      <button
                        key={spec.id}
                        type='button'
                        onClick={() => setSelectedSpec(spec.id)}
                        className={`p-2 border rounded flex flex-col items-center ${
                          selectedSpec === spec.id
                            ? 'bg-blue-100 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Image
                          src={spec.classIcon}
                          alt={spec.name}
                          className='w-8 h-8 mb-1'
                        />
                        <span>{spec.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className='mb-4'>
                <label htmlFor='patch' className='block mb-2 font-medium'>
                  Номер патча:
                </label>
                <input
                  id='patch'
                  type='text'
                  value={patch}
                  onChange={(e) => setPatch(e.target.value)}
                  className='w-full p-2 border rounded'
                  placeholder='Например: 10.2.5'
                  required
                />
              </div>

              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='px-4 py-2 border rounded hover:bg-gray-50'
                >
                  Отмена
                </button>
                <button
                  type='submit'
                  disabled={isLoading || !selectedClass || !patch}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300'
                >
                  {isLoading ? 'Создание...' : 'Создать гайд'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
