import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/zip",
];

export const UploadFilesSchema = z.object({
  files: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Selecione pelo menos um arquivo")
    .refine((files) => files?.length <= 3, "Envie 3 arquivos por vez")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      "O tamanho máximo permitido é 10MB",
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => ACCEPTED_TYPES.includes(file.type)),
      "Formato de arquivo não suportado",
    ),
});


export type UploadsFilesInput = z.infer<typeof UploadFilesSchema>