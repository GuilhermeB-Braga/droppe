import prisma from "@/lib/prisma";

export default class SessionService {
  async create(name: string) {
    try {
      

      const session = await prisma.session.create({
        data: {
          name,
          code: accessCode,
        },
      });

      console.log("Created Session:", session);

      return session;
    } catch (error) {
      console.log("Não foi possível salvar a sessão agora.", error);
    }
  }

  async login(name: string, code: string) {
    try {
      const session = await prisma.session.findUnique({
        where: {
          name: name,
          code: code,
        },
      });

      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      return session;
    } catch (error) {
      console.log("Falha ao encontrar sessão", error);
      return null;
    }
  }

  async getSession(sessionId: string) {
    try {
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          files: true,
        },
      });

      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      return session;
    } catch (error) {
      console.log("Falha ao encontrar sessão", error);
      return null;
    }
  }
}
