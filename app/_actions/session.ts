"use server";
import SessionService from "@/services/session";
import { redirect } from "next/navigation";

const sessionService = new SessionService();

export async function createSessionAction(
  _prevState: unknown,
  formData: FormData,
) {
  let sessionId: string | undefined;
  try {
    const name = formData.get("name") as string;

    if (!name) return { error: "Nome obrigatório!", field: "name" };

    const session = await sessionService.create(name);
    sessionId = session?.id;
  } catch (error) {
    console.log(error);
    return;
  }

  if (sessionId) {
    return redirect(`/session/${sessionId}`);
  }
}

export async function loginSessionAction(
  _prevState: unknown,
  formData: FormData,
) {
  let sessionId;

  try {
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;

    if (!name) return { error: "Informe o nome da sessão.", field: "name" };
    if (!code) return { error: "Informe o código da sessão.", field: "accessCode" };

    const session = await sessionService.login(name, code);

    if (!session)
      return {
        error: "Sessão não encontrada ou código inválido",
        field: "accessCode",
      };

    sessionId = session?.id;
  } catch (error) {
    console.log(error);
    return;
  }

  if (sessionId) {
    return redirect(`/session/${sessionId}`);
  }
}
