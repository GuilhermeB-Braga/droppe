"use client";
import Button from "@/components/Button";
import { LuUpload } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFilesSchema, UploadsFilesInput } from "@/lib/validations/upload";
import { useForm, useWatch } from "react-hook-form";
import InputError from "@/components/InputError";
import FilesToSend from "@/components/FilesToSend";
import { useState, useTransition } from "react";
import { getUploadUrlAction } from "@/app/_actions/file";

interface UploadFormProps {
  sessionId: string;
}

export default function UploadForm({ sessionId }: UploadFormProps) {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    reset,
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

    startTransition(async () => {
      try {
        const files: File[] = Array.from(data.files);

        files.forEach(async (file) => {
          const result = await getUploadUrlAction(
            file.name,
            file.type,
            sessionId,
          );

          if ("error" in result) {
            setError("files", { message: result.error });
            return;
          }

          const uploadResponse = await fetch(result.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!uploadResponse) {
            setError("files", {
              type: "validate",
              message: `Erro ao subir arquivo ${file.name}`,
            });
          }

          setSuccessMessage("Arquivos enviados com sucesso :)");
          reset();
        });
      } catch (error) {
        console.log(error);
        setError("files", {
          message: "Erro ao processar um ou mais arquivos.",
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
      flex flex-col gap-5 border border-border-custom rounded-custom p-5 md:w-[45%]"
    >
      <div className="flex flex-col md:flex-row gap-5 items-end">
        <h2>Transferência de Arquivos(s)</h2>

        {successMessage && (
          <p className="text-green-400 text-sm">{successMessage}</p>
        )}

        {errors.files && <InputError message={errors.files.message} />}
      </div>

      <div
        className={`
          relative group flex flex-col items-center justify-center gap-5 border-2 border-dashed
          duration-500 cursor-pointer border-border-custom rounded-custom p-10 h-[80%] hover:rounded-sm
          hover:border-white
          ${errors.files && "border-orange-600"}
          ${isPending && "opacity-70"}
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
          disabled={isPending}
        />
      </div>

      <FilesToSend
        error={errors.files ? true : false}
        files={files}
        onRemove={handleRemoveFile}
      />

      <Button
        text={isPending ? "Carregando..." : "Upload"}
        disabled={isPending}
      />
    </form>
  );
}
