"use client";
import { LuLogOut } from "react-icons/lu";
import Button from "@/src/components/Button";
import Logo from "@/src/components/Logo";
import SessionData from "@/src/components/SessionData";
import QrCode from "@/src/components/QrCode";
import { useSession } from "@/src/contexts/SessionProvider";
import Link from "next/link";
import Image from "next/image";

interface Data {
  label: string;
  data: string;
}

export default function Header() {
  const { id, name, code, timer } = useSession();
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/session/qrcode?session=${id}`;

  const sessionData: Data[] = [
    {
      label: "Nome da sessão",
      data: name,
    },
    {
      label: "Código da sessão",
      data: code,
    },
    {
      label: "Encerra em",
      data: timer.text,
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
          <QrCode imageUrl={imageUrl}/>
        </div>

        <div className="md:hidden relative w-50 h-50">
          <Image
            alt="QR Code para acesso a sessão"
            width={500} height={500}
            src={imageUrl} priority
            className="absolute object-contain rounded-2xl border-5 border-background-dark shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-5 md:contents w-fit">
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            {sessionData.map((data, index) => (
              <SessionData key={index} label={data.label} data={data.data} />
            ))}
          </div>

          <Link href="/">
            <Button textSize="sm" text="Sair da sessão" icon={LuLogOut} />
          </Link>
        </div>
      </div>
    </header>
  );
}
