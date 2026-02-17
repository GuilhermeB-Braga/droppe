"use client";
import { PiQrCodeBold } from "react-icons/pi";

import Button from "../Button";
import { useState } from "react";
import Image from "next/image";

export default function QrCode({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button icon={PiQrCodeBold} onClick={() => setOpen(!open)} />

      {open && (
        <div
          className="
      absolute z-9999 bottom-10 right-10 w-45 h-45 bg-background-dark rounded-2xl"
        >
          <Image
            alt="QR Code para acesso a sessão"
            fill
            src={imageUrl}
            className="object-contain rounded-2xl border-5 border-background-dark shadow-lg"
          />
        </div>
      )}
    </>
  );
}
