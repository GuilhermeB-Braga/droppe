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

      <main className="flex flex-col md:flex-row min-h-[76vh] p-5 gap-5">
        <UploadForm/>
        <FilesContainer/>
      </main>
    </div>
  );
}
