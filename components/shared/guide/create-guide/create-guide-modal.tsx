"use client";

import { useState } from "react";
import { ClassSelection, ClassSpecialization } from "@prisma/client";

interface CreateGuideModalProps {
  classes: ClassSelection[];
  onClose: () => void;
  onCreate: (guideData: {
    classId: number;
    specializationId?: number;
    patch: string;
  }) => Promise<void>;
}

export default function CreateGuideModal({
  classes,
  onClose,
  onCreate,
}: CreateGuideModalProps) {
  const [selectedClass, setSelectedClass] = useState<ClassSelection | null>(
    null
  );
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<ClassSpecialization | null>(null);
  const [patch, setPatch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClassSelect = (cls: ClassSelection) => {
    setSelectedClass(cls);
    setSelectedSpecialization(null);
  };

  const handleSpecializationSelect = (spec: ClassSpecialization) => {
    setSelectedSpecialization(spec);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !patch) return;

    setIsLoading(true);
    try {
      await onCreate({
        classId: selectedClass.id,
        specializationId: selectedSpecialization?.id,
        patch,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create guide:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Создать новый гайд</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Выберите класс:</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => handleClassSelect(cls)}
                  className={`p-3 rounded-lg border flex flex-col items-center ${
                    selectedClass?.id === cls.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <img
                    src={cls.classIcon}
                    alt={cls.name}
                    className="w-10 h-10 mb-1"
                  />
                  <span>{cls.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedClass && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">
                Выберите специализацию (опционально):
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedClass.specializations.map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => handleSpecializationSelect(spec)}
                    className={`p-3 rounded-lg border flex flex-col items-center ${
                      selectedSpecialization?.id === spec.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <img
                      src={spec.specIcon}
                      alt={spec.name}
                      className="w-10 h-10 mb-1"
                    />
                    <span>{spec.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="patch" className="block font-medium mb-2">
              Номер патча:
            </label>
            <input
              id="patch"
              type="text"
              value={patch}
              onChange={(e) => setPatch(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
              placeholder="Например: 10.2.5"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedClass || !patch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Создание..." : "Создать гайд"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
