"use client";

import { createGuide, getClasses, getModes } from "@root/app/guide";
import { Button } from "@root/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@root/components/ui/dialog";
import { Label } from "@root/components/ui/label";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@root/components/ui/tooltip";
import { Input } from "@root/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateGuideModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState<
    Awaited<ReturnType<typeof getClasses>>
  >([]);
  const [modes, setModes] = useState<Awaited<ReturnType<typeof getModes>>>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [patch, setPatch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async () => {
    setIsLoading(true);
    try {
      const [classesData, modesData] = await Promise.all([
        getClasses(),
        getModes(),
      ]);
      setClasses(classesData);
      setModes(modesData);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !selectedSpec || !selectedMode || !patch) return;

    setIsLoading(true);
    try {
      const createdGuide = await createGuide({
        classId: selectedClass,
        specializationId: selectedSpec,
        modeId: selectedMode,
        patch,
      });

      toast.success("Гайд успешно создан!");
      //test
      // Редирект через 1 секунду после успешного сообщения
      setTimeout(() => {
        router.push(`/havoc/${createdGuide.id}`);
      }, 1000);

      setIsOpen(false);
      // Сброс формы
      setSelectedClass(null);
      setSelectedSpec(null);
      setSelectedMode(null);
      setPatch("");
    } catch (error) {
      toast.error("Не удалось создать гайд");
      console.error("Error creating guide:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClassData = classes.find((c) => c.id === selectedClass);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            onClick={openModal}
            disabled={isLoading}
            variant="default"
            className="font-bold mb-4"
          >
            Создание нового гайда
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Создание нового гайда</DialogTitle>

              <DialogDescription>
                <div>
                  <Label className="mb-2 font-medium">Выберите класс:</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {classes.map((cls) => (
                      <Button
                        key={cls.id}
                        variant="wowIcon"
                        size="wowIcon"
                        onClick={() => {
                          setSelectedClass(cls.id);
                          setSelectedSpec(null); // Сброс специализации при смене класса
                        }}
                        className={`border rounded flex flex-col items-center ${
                          selectedClass === cls.id
                            ? "bg-blue-100 border-blue-500 grayscale-0"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Image
                                src={cls.classIcon}
                                alt={cls.name}
                                width={40}
                                height={40}
                                className="cursor-pointer"
                              />
                            </TooltipTrigger>
                            <TooltipContent>{cls.name}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Button>
                    ))}
                  </div>

                  {selectedClass && (
                    <div className="mb-4 mt-2">
                      <Label className="block mb-2 font-medium">
                        Выберите специализацию:
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedClassData?.specializations.map((spec) => (
                          <Button
                            key={spec.id}
                            type="button"
                            variant="wowIcon"
                            size="wowIcon"
                            onClick={() => setSelectedSpec(spec.id)}
                            className={`border rounded flex flex-col items-center ${
                              selectedSpec === spec.id
                                ? "bg-blue-100 border-blue-500 grayscale-0"
                                : "hover:bg-gray-50 "
                            }`}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Image
                                    src={spec.specIcon}
                                    alt={spec.name}
                                    width={40}
                                    height={40}
                                    className="cursor-pointer"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>{spec.name}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <Label className="block mb-2 font-medium">
                      Выберите режим:
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {modes.map((mode) => (
                        <Button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedMode(mode.id)}
                          className={`p-2 border rounded ${
                            selectedMode === mode.id
                              ? "dark:bg-blue-500 bg-blue-500 border-blue-500"
                              : "dark:hover:bg-gray-50"
                          }`}
                        >
                          {mode.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="patch" className="block mb-2 font-medium">
                      Номер патча:
                    </Label>
                    <Input
                      id="patch"
                      type="text"
                      value={patch}
                      onChange={(e) => setPatch(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Например: 10.2.5"
                      required
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !selectedClass ||
                  !selectedSpec ||
                  !selectedMode ||
                  !patch
                }
              >
                {isLoading ? "Создание..." : "Создать гайд"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
