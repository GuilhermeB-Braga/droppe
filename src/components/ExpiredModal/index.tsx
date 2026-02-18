"use client";
import { useSession } from "@/src/contexts/SessionProvider";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpiredModal() {
  const router = useRouter();
  const [isMonted, setIsMounted] = useState(false);
  const { timer } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMonted || !timer.finished) return null;

  const handleGoHome = () => {
    router.push("/");
  }

  return (
    <div
      className="
        fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50
        grid place-items-center gap-4 p-5 text-center
        "
    >
      <div className="flex flex-col gap-5 bg-background-dark rounded-custom p-5 min-h-55 max-w-140 text-left shadow-lg">
        <h2 className="text-2xl font-bold">Sessão Finalizada</h2>
        <p className="text-gray-300 mt-2 text-sm">
          Sua sessão expirou. Por favor, crie uma nova sessão para continuar
          usando o Droppe. Em alguns instantes seus arquivos serão removidos
          permanentemente dos nossos servidores. Agradecemos por usar a Droppe!
        </p>

        <Button text="Voltar a tela inicial" onClick={handleGoHome}/>
      </div>
    </div>
  );
}
