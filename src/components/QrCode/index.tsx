"use client";
import { PiQrCodeBold } from "react-icons/pi";

import Button from "../Button";
import { useState } from "react";

export default function QrCode() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button icon={PiQrCodeBold} onClick={() => setOpen(!open)}/>

      {open && (
        <div
          className="
      absolute z-9999 bottom-10 right-10 w-50 h-50 bg-background-dark
      rounded-custom "
        ></div>
      )}
    </>
  );
}
