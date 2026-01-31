import { FaArrowRight } from "react-icons/fa6";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LabelContainer from "@/components/LabelContainer";

export default function LoginSectionForm() {
  return (
    <form action="" className="flex flex-col gap-6">
      <LabelContainer label="Nome da sessão" htmlFor="name">
        <Input name="name" type="text" placeholder="Insira o nome da sessão" />
      </LabelContainer>

      <LabelContainer label="Código da sessão" htmlFor="code">
        <Input name="code" type="text" placeholder="Código de 6 digitos" />
      </LabelContainer>

      <Button
        text="Acessar sessão existente"
        icon={FaArrowRight}
        otherStyles="w-full"
      />
    </form>
  );
}
