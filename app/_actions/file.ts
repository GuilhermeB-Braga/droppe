"use server";
import FileService from "@/services/file";

const fileService = new FileService();

export async function getUploadUrlAction(
  fileName: string,
  fileType: string,
  sessionId: string,
) {
  try {
    return await fileService.getPresignedUrl(fileName, fileType, sessionId);
  } catch (error) {
    return {
      error: "Não foi possível gerar a permissão de upload.",
      message: error,
    };
  }
}

export async function getDownloadUrlAction(fileKey: string, originalName: string) {
  try {
    const url = await fileService.getDownloadUrl(fileKey, originalName);
    return { url };
  } catch (error) {
    return { message: "Houve um erro ao gerar o link de download.", error };
  }
}
