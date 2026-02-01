"use client";
import { FaArrowRight } from "react-icons/fa6";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LabelContainer from "@/components/LabelContainer";
import { useForm } from "react-hook-form";
import {
  AccessSectionSchema,
  AccessSectionInput,
} from "@/lib/validations/session";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "@/components/InputError";

export default function LoginSectionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccessSectionInput>({
    resolver: zodResolver(AccessSectionSchema),
  });

  const onSubmit = (data: AccessSectionInput) => {
    console.log("Dados V-alidados: ", data);
  };

  return (
    <form
      action="GET"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <LabelContainer label="Nome da sessão" htmlFor="name">
        <Input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Insira o nome da sessão"
          error={errors.name ? true : false}
        />
        {errors.name && <InputError message={errors.name.message} />}
      </LabelContainer>

      <LabelContainer label="Código da sessão" htmlFor="code">
        <Input
          {...register("accessCode")}
          name="accessCode"
          type="text"
          placeholder="Código de 6 digitos"
          error={errors.accessCode ? true : false}
        />
        {errors.accessCode && 
          <InputError message={errors.accessCode.message} />
        }
      </LabelContainer>

      <Button
        text="Acessar sessão existente"
        icon={FaArrowRight}
        otherStyles="w-full"
      />
    </form>
  );
}
