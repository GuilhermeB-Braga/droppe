import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LabelContainer from "@/components/LabelContainer";

export default function CreateSectionForm() {
  return (
    <form method="GET"  action='/session/askfnao'>
      <LabelContainer htmlFor="name" label="Iniciar uma nova sessão">
        
        <div className="grid grid-cols-3 gap-5">
          <Input
            name="name"
            type="text"
            radius="12"
            otherStyles="col-span-2"
            placeholder="Defina o nome da sessão"
          />

          <Button text="Nova Seção" icon={FiPlus} direction="left"/>
        </div>
      </LabelContainer>
    </form>
  );
}
