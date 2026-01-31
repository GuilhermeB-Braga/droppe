import Button from "@/components/Button";
import { LuUpload } from "react-icons/lu";

export default function UploadForm() {
  return (
    <form
      action=""
      className="flex flex-col gap-5 border border-border-custom rounded-custom p-10 w-[45%]"
    >
      <h2>Transferência de Arquivos(s)</h2>

      <div
        className="
          flex flex-col items-center justify-center gap-5 border-2 border-dashed duration-500 cursor-pointer
          border-border-custom rounded-custom p-10 h-[80%] hover:rounded-sm hover:border-white"
      >
        <LuUpload size={40} className="text-text-muted" />

        <div className="text-center text-sm">
          <p className="font-semibold">
            Solte seus arquivos aqui ou clique em upload
          </p>
          <p className="text-text-muted">
            Suporte para todos os tipos de aquivos de até 100mb cada
          </p>
        </div>
      </div>

      <Button text="Upload" />
    </form>
  );
}
