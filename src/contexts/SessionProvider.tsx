"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import useTimer from "../hooks/useTimer";
import { useRouter } from "next/navigation";
import SessionService from "../services/SessionService";

interface File {
  id: string;
  createdAt: Date;
  originalName: string;
  savedName: string;
  fileSize: number;
  key: string;
  path: string;
  sessionId: string;
  downloaded?: boolean;
}

interface Session {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  files?: File[];
}

interface SessionContextData extends Session {
  timer: {
    minutes: number;
    seconds: number;
    text: string;
    loading: boolean;
    finished: boolean;
  };
}

interface SessionProviderProps {
  children: ReactNode;
  session: Session;
}

const sessionService = new SessionService();

const SessionContext = createContext<SessionContextData | null>(null);

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  const router = useRouter();

  const finishSession = useCallback(async () => {
    try {
      const response = await sessionService.checkExpiration(session.id);

    } catch (error) {
      console.error("Erro ao verificar expiração da sessão:", error);
      return router.push("/");
    }
  }, [session.id, router]);

  const { minutes, seconds, text, loading, finished } = useTimer(
    session.createdAt,
    15,
    finishSession,
  );

  const value = useMemo(
    () => ({
      ...session,
      timer: {
        minutes,
        seconds,
        text,
        loading,
        finished,
      },
    }),
    [session, minutes, seconds, text, loading, finished],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession deve ser usado dentro de um SessionProvider");
  return context;
}
