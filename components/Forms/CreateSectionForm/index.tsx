"use client";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LabelContainer from "@/components/LabelContainer";
// React Use Form
import { useForm } from "react-hook-form";
// ZOD
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSessionSchema,
  CreateSessionInput,
} from "@/lib/validations/session";
import { useRouter } from "next/navigation";
import InputError from "@/components/InputError";

export default function CreateSectionForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
  });

  const onSubmit = (data: CreateSessionInput) => {
    console.log("Dados validados:", data);
    router.push(`/session/${data.name}`);
  };

  return (
    <form method="GET" onSubmit={handleSubmit(onSubmit)}>
      <LabelContainer htmlFor="name" label="Iniciar uma nova sessão">
        <div className="grid md:grid-cols-3 gap-5">
          <Input
            {...register("name")}
            name="name"
            type="text"
            radius="12"
            otherStyles={`md:col-span-2`}
            placeholder="Defina o nome da sessão"
            error={errors.name ? true : false}
          />

          <Button text="Nova Seção" icon={FiPlus} direction="left" />
        </div>
      </LabelContainer>

      {errors.name && (
        <InputError message={errors.name.message} />
      )}
      
    </form>
  );
}
