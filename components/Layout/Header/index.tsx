"use client";
import { LuLogOut } from "react-icons/lu";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import SessionData from "@/components/SessionData";
import QrCode from "@/components/QrCode";

interface Data {
  label: string;
  data: string;
}

export default function Header() {
  const sessionData: Data[] = [
    {
      label: "Nome da sessão",
      data: "minha sessão",
    },
    {
      label: "Código da sessão",
      data: "R7B806",
    },
    {
      label: "Encerra em",
      data: "11:00",
    },
  ];

  return (
    <header className="flex flex-col lg:flex-row gap-7.5 items-center justify-between pt-5 md:px-7.5 md:pb-10">
      <Logo />

      <div
        className="
      bg-background-dark md:bg-transparent p-2.5 md:p-0 rounded-custom md:w-fit flex md:items-center
      justify-between md:justify-center gap-5"
      >
        <div className="hidden md:inline-block">
          <QrCode />
        </div>

        <div className="md:hidden grid place-items-center w-50 h-50 p-2 bg-neutral-400 rounded-custom">
          <div className="w-full h-full rounded-custom bg-white"></div>
        </div>

        <div className="flex flex-col gap-5 md:contents w-fit">
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            {sessionData.map((data, index) => (
              <SessionData key={index} label={data.label} data={data.data} />
            ))}
          </div>

          <Button
            textSize="sm"
            text="Sair da sessão"
            icon={LuLogOut}
          />
        </div>
      </div>
    </header>
  );
}
