"use client";
import { IoCloudDoneOutline } from "react-icons/io5";
import {
  MdOutlineFileDownload,
  MdOutlineFileDownloadDone,
} from "react-icons/md";
import Button from "../Button";

export default function FilesControls() {
  return (
    <div className="flex h-fit p-0.5 rounded-xl gap-1">
      <div
        className={`
          flex items-center justify-around gap-5 transition-all duration-500
          py-1 text-sm  rounded-xl border border-border-custom flex-1
          `}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-300 border border-green-600" />
          <span>Arquivos Ativos (10)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <MdOutlineFileDownloadDone />
          <span>Baixados (2/10)</span>
        </div>
      </div>

      <Button
        text="Baixar todos os arquivos"
        textSize="sm"
        icon={MdOutlineFileDownload}
        direction="left"
      />
    </div>
  );
}
