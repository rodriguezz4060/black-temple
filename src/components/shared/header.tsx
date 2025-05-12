import { cn } from "@root/lib/utils";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Container, DarkModeToggle } from ".";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn(" bg-[#F0F8FF] dark:bg-black ", className)}>
      <Container className="dark:bg-black flex items-center justify-between py-3 ">
        {/* Левая часть */}

        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <div>
            <h1 className="text-2xl uppercase font-black">Black Temple</h1>
          </div>
        </div>

        {/* Правая часть */}

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <Button className="cursor-pointer flex items-center gap-1">
            <User size={16} />
            Вход
          </Button>
        </div>
      </Container>
    </header>
  );
};
