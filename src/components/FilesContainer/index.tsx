"use client";
import { useState } from "react";
import FilesControls from "../FilesControls";
import {
  MdOutlineFileDownload,
  MdOutlineFileDownloadDone,
} from "react-icons/md";
import FileService from "@/src/services/FileService";
import { useSession } from "@/src/contexts/SessionProvider";

const fileService = new FileService();

interface File {
  id: string;
  createdAt: Date;
  originalName: string;
  savedName: string;
  fileSize: number;
  key: string;
  path: string;
  sessionId: string;
  downloaded?: boolean;
}

export default function FilesContainer() {
  const { files } = useSession();

  const [handleFiles, setHandleFiles] = useState<File[]>(files || []);

  const handleDownload = async (index: number, file: File) => {
    console.log("Clicado - ", index, file);

    try {
      const result = await fileService.getDownloadUrl(file.id);
      window.open(result, "_blank");
      const updatedFiles = handleFiles.map((f, i) =>
        i === index ? { ...f, downloaded: true } : f,
      );
      setHandleFiles(updatedFiles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 flex-1">
      <FilesControls />

      <ul className="border border-border-custom rounded-custom p-5 grow flex flex-col gap-5 text-sm">
        {handleFiles
          .sort((a, b) => Number(a.downloaded) - Number(b.downloaded))
          .map((file, index) => (
            <li
              key={index}
              className={`
                flex justify-between items-end p-2 cursor-pointer border-b-border-custom
                rounded-sm hover:bg-white/20 hover:border-transparent duration-500 ease-in-out
                ${file.downloaded && "opacity-40"}
                `}
              onClick={() => {
                if (!file.downloaded) {
                  handleDownload(index, file);
                }
              }}
            >
              <span>{file.originalName}</span>

              {!file.downloaded ? (
                <MdOutlineFileDownload size={18} />
              ) : (
                <MdOutlineFileDownloadDone size={18} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
