import FilesContainer from "@/src/components/FilesContainer";
import UploadForm from "@/src/components/Forms/UploadForm";
import Header from "@/src/components/Layout/Header";
import SessionService from "@/src/services/SessionService";
import { notFound } from "next/navigation";

const sessionService = new SessionService();

interface SessionPageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;

  const session = await sessionService.getSectionById(sessionId);

  if (!session) return notFound();

  const { id, name, code, files } = session;
  const filesArray =
    files?.map((file) => {
      return { ...file, downloaded: false };
    }) || [];

  const stringId = String(id);

  return (
    <div>
      <Header sessionName={name} sessionCode={code} />

      <main className="flex flex-col md:flex-row min-h-[76vh] p-5 gap-5">
        <UploadForm sessionId={stringId} />
        <FilesContainer files={filesArray} />
      </main>
    </div>
  );
}
