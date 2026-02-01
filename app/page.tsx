import CreateSectionForm from "@/components/Forms/CreateSectionForm";
import LoginSectionForm from "@/components/Forms/LoginSectionForm";
import SVGComponent from "@/components/SVGComponent";

export default function Home() {
  return (
    <main
      className="
      min-h-screen bg-background flex flex-col items-center justify-center
      md:flex-row md:gap-15 px-7.5 md:px-15 py-5"
    >
      <div className="flex-1 w-full">
        <SVGComponent />
      </div>

      <div className="md:w-[50%] flex flex-col gap-7.5">
        <h1 className="text-[28px] md:text-[32px] font-medium">
          Crie uma seção e <span className="text-primary italic">droppe</span>{" "}
          seus arquivos :)
        </h1>

        {/* Formulário - ADAPTAR DEPOIS */}
        <div className="flex flex-col gap-5 md:gap-2">
          <CreateSectionForm />

          <div className="flex gap-5 items-center text-text-muted">
            <hr className="my-5 rounded-2xl text-white/16 flex-1" />
            <span className="col-span-2 w-fit font-light">
              ou crie uma sessão
            </span>
            <hr className="my-5 rounded-2xl text-white/16 flex-1" />
          </div>

          <LoginSectionForm />
        </div>
      </div>
    </main>
  );
}
