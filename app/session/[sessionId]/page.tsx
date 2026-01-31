import Logo from "@/components/Logo";

interface SessionPageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;

  return (
    <main>

        <h1>Página do ID: {sessionId}</h1>

        <Logo/>
        
    </main>
  );
}
