import { prisma } from "@/lib/prisma";

export default class SessionService {
  async create(name: string) {
    try {
      const accessCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const session = await prisma.session.create({
        data: {
          name,
          code: accessCode,
        },
      });

      console.log("Created Session:", session);

      return session;
    } catch (error) {
        console.log('Não foi possível salvar a sessão agora.', error)
    }
  }
}
