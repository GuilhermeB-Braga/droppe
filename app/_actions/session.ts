"use server";
import SessionService from "@/services/session";
import { redirect } from "next/navigation";

const sessionService = new SessionService();

export async function createSessionAction(_prevState: unknown, formData: FormData) {
  let sessionId: string | undefined;
  try {
    const name = formData.get("name") as string;

    if (!name) throw new Error("Nome obrigatório!");

    const session = await sessionService.create(name);
    sessionId = session?.id;

  } catch (error) {

    return {
      error: "Ocorreu um erro ao criar sua sessão. Tente novamente.",
      message: error,
    };
  }

  if (sessionId) {
    return redirect(`/session/${sessionId}`);
  }
}
