'use client'
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
    <header className="flex items-center justify-between pt-5 px-7.5 pb-10">
      <Logo />

      <div className="flex items-center justify-center gap-10">
        <QrCode />

        <div className="flex gap-10">
          {sessionData.map((data, index) => (
            <SessionData key={index} label={data.label} data={data.data} />
          ))}
        </div>

        <Button textSize="sm" text="Sair da sessão" icon={LuLogOut} />
      </div>
    </header>
  );
}
