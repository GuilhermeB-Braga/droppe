"use client";
import Button from "@/components/Button";
import { LuUpload } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFilesSchema, UploadsFilesInput } from "@/lib/validations/upload";
import { useForm, useWatch } from "react-hook-form";
import InputError from "@/components/InputError";
import FilesToSend from "@/components/FilesToSend";

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UploadsFilesInput>({
    resolver: zodResolver(UploadFilesSchema),
  });

  const files = useWatch({
    control,
    name: "files",
  });

  const handleRemoveFile = (indexToRemove: number) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const updatedFiles = fileArray.filter(
      (_, index) => index !== indexToRemove,
    );

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));

    setValue("files", dataTransfer.files, { shouldValidate: true });
  };

  const onSubmit = (data: UploadsFilesInput) => {
    console.log("Dados validados:", data);
  };

  return (
    <form
      action="GET"
      onSubmit={handleSubmit(onSubmit)}
      className="
      flex flex-col gap-5 border border-border-custom rounded-custom p-5 md:w-[45%]"
    >
      <div className="flex flex-col gap-5 items-center">
        <h2>Transferência de Arquivos(s)</h2>

        {errors.files && <InputError message={errors.files.message} />}
      </div>

      <div
        className={`
          relative group flex flex-col items-center justify-center gap-5 border-2 border-dashed
          duration-500 cursor-pointer border-border-custom rounded-custom p-10 h-[80%] hover:rounded-sm
          hover:border-white ${errors.files && "border-orange-600"}
          `}
      >
        <LuUpload size={40} className="text-text-muted" />

        <div className="text-center text-sm">
          <p className="font-semibold">
            Solte seus arquivos aqui ou clique em upload
          </p>
          <p className="text-text-muted">
            Suporte para todos os tipos de aquivos de até 10mb cada
          </p>
        </div>

        <input
          {...register("files")}
          type="file"
          name="files"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title=""
        />
      </div>

      <FilesToSend error={errors.files? true: false} files={files} onRemove={handleRemoveFile} />

      <Button text="Upload" />
    </form>
  );
}
