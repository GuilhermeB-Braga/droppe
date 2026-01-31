import FilesContainer from "@/components/FilesContainer";
import UploadForm from "@/components/Forms/UploadForm";
import Header from "@/components/Layout/Header";

interface SessionPageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;

  return (
    <div>
      <Header />

      <main className="flex min-h-[76vh] p-7.5 gap-5">
        <UploadForm/>
        <FilesContainer/>
      </main>
    </div>
  );
}
