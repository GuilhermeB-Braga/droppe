import { LuTrash } from "react-icons/lu";

interface FilesToSendProps {
  files: FileList | undefined;
  error: boolean
  onRemove: (index: number) => void
}

export default function FilesToSend({ files, error, onRemove }: FilesToSendProps) {
  const fileArray = files ? Array.from(files) : [];

  return (
    <ul className="flex flex-col gap-5">
      {fileArray.map((file, index) => (
        <li
        key={index}
        className={`
            flex justify-between gap-5 border border-border-custom px-5 py-2.5
            items-center rounded-lg ${error && 'border-orange-600'}`}
        >
          <div>
            <p className="text-sm">{file.name}</p>
            <p className="text-xs text-text-muted">10mb</p>
          </div>
          <LuTrash onClick={() => onRemove(index)}/>
        </li>
      ))}
    </ul>
  );
}
