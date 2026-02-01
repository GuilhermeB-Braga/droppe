"use client";
import { useState } from "react";
import FilesControls from "../FilesControls";
import {
  MdOutlineFileDownload,
  MdOutlineFileDownloadDone,
} from "react-icons/md";

interface File {
  filename: string;
  downloaded: boolean;
}

export default function FilesContainer() {
  const [files, setFiles] = useState<File[]>([
    {
      filename: "dropfile1.png",
      downloaded: false,
    },
    {
      filename: "dropfile2.png",
      downloaded: false,
    },
    {
      filename: "dropfile3.png",
      downloaded: false,
    },
  ]);

  const handleUpdateFiles = (index: number): void => {
    const updatedFiles = files.map((file, i) => ({
      ...file,
      downloaded:
        index === i ? (file.downloaded ? true : true) : file.downloaded,
    }));
    setFiles(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-5 flex-1">
      <FilesControls />

      <ul className="border border-border-custom rounded-custom p-5 grow flex flex-col gap-5 text-sm">
        {files
          .sort((a, b) => Number(a.downloaded) - Number(b.downloaded))
          .map((file, index) => (
            <li
              key={index}
              className={`
                flex justify-between items-end p-2 cursor-pointer border-b-border-custom
                rounded-sm hover:bg-white/20 hover:border-transparent duration-500 ease-in-out
                ${file.downloaded && "opacity-40"}
                `}
              onClick={() => handleUpdateFiles(index)}
            >
              <span>{file.filename}</span>

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
