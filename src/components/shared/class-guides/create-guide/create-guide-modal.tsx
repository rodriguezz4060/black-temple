"use client";

import Image from "next/image";
import { Button } from "@root/components/ui/button";
import { InitialClassSelection } from "@root/@types/prisma";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@root/components/ui/dialog";
import { Label } from "@root/components/ui/label";
import { Mode } from "@prisma/client";
import { Badge } from "@root/components/ui/badge";
import { useCreateGuide } from "@root/components/hooks";
import { TooltipWrapper } from "@root/components/shared/";
import { Separator } from "@root/components/ui/separator";

interface InitialData {
  classes: InitialClassSelection[];
  modes: Mode[];
  patch: string;
}

export default function CreateGuideModal({
  initialData,
}: {
  initialData: InitialData;
}) {
  const { classes, modes } = initialData;

  const {
    selectedClass,
    selectedSpec,
    selectedMode,
    isLoading,
    setSelectedClass,
    setSelectedSpec,
    setSelectedMode,
    handleSubmit,
  } = useCreateGuide();

  const selectedClassData = classes.find((c) => c.id === selectedClass);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-bold ">
            Создание нового гайда
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Создание нового гайда</DialogTitle>
              <Label className="font-medium my-2 text-md">
                Выберите класс:
              </Label>
              <Separator className="" />
              <div className="flex flex-wrap gap-2">
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
                        : selectedClass
                          ? "grayscale"
                          : "grayscale-0 hover:bg-gray-50"
                    }`}
                  >
                    <TooltipWrapper content={cls.name}>
                      <Image
                        src={cls.classIcon}
                        alt={cls.name}
                        width={40}
                        height={40}
                        className="cursor-pointer"
                      />
                    </TooltipWrapper>
                  </Button>
                ))}
              </div>
              <Separator className="" />

              {selectedClass && (
                <div className=" mt-2">
                  <Label className="block mb-2 font-medium text-md">
                    Выберите специализацию:
                  </Label>
                  <Separator className="my-2" />
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
                            : selectedSpec
                              ? "grayscale"
                              : "grayscale-0 hover:bg-gray-50"
                        }`}
                      >
                        <TooltipWrapper content={spec.name}>
                          <Image
                            src={spec.specIcon}
                            alt={spec.name}
                            width={40}
                            height={40}
                            className="cursor-pointer"
                          />
                        </TooltipWrapper>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <Separator />
              <div className="mb-4">
                <Label className="block mb-2 font-medium text-md">
                  Выберите режим:
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {modes.map((mode) => (
                    <Button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedMode(mode.id)}
                      className={`h-8 border rounded font-bold ${
                        selectedMode === mode.id
                          ? "dark:bg-blue-500 bg-blue-500 border-blue-500 text-amber-50"
                          : "dark:hover:bg-gray-50 "
                      }`}
                    >
                      {mode.name}
                    </Button>
                  ))}
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <div className="flex items-center justify-between w-full">
                <Badge className="mr-auto">
                  Версия игры: {initialData.patch}
                </Badge>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={
                    isLoading ||
                    !selectedClass ||
                    !selectedSpec ||
                    !selectedMode
                  }
                  className="font-bold"
                >
                  {isLoading ? "Создание..." : "Создать гайд"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
