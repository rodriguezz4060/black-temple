"use client";

import { Container } from "@/components/shared";
import GuideButton from "@/components/shared/guide-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createGuide } from "@/app/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  createGuideSchemas,
  TCreateGuideSchemas,
} from "@/components/shared/guide/editor/schemas/create-guide-schemas";

export default function HavocPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCreateGuideSchemas>({
    resolver: zodResolver(createGuideSchemas),
    defaultValues: {
      spec: "",
      mode: "",
      patch: "",
      title: "",
    },
  });

  const onSubmit = async (data: TCreateGuideSchemas) => {
    setIsLoading(true);
    try {
      await createGuide(data);
      toast.success("Гайд успешно создан");
      reset();
    } catch {
      toast.error("Ошибка при создании гайда");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container className="secondary dark:bg-zinc-900 px-4 pb-10">
        <Title text="Истребление" size="lg" className="font-extrabold pt-4" />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Новый гайд</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Новый гайд</DialogTitle>
              <DialogDescription>
                Укажите спек мод и патч для нового гайда.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="spec" className="text-right">
                    Спек
                  </Label>
                  <div className="col-span-3 space-y-1">
                    <Input id="spec" {...register("spec")} className="w-full" />
                    {errors.spec && (
                      <p className="text-sm text-red-500">
                        {errors.spec.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mode" className="text-right">
                    Мод
                  </Label>
                  <div className="col-span-3 space-y-1">
                    <Input id="mode" {...register("mode")} className="w-full" />
                    {errors.mode && (
                      <p className="text-sm text-red-500">
                        {errors.mode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patch" className="text-right">
                    Патч
                  </Label>
                  <div className="col-span-3 space-y-1">
                    <Input
                      id="patch"
                      {...register("patch")}
                      className="w-full"
                    />
                    {errors.patch && (
                      <p className="text-sm text-red-500">
                        {errors.patch.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Создание..." : "Создать"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Container>

      <Container className="dark:bg-zinc-900">
        <GuideButton />
      </Container>
    </>
  );
}
