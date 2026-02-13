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
import { useTransition } from "react";
import SessionService from "@/services/SessionService";
import { useRouter } from "next/navigation";

const sessionService = new SessionService();

export default function LoginSectionForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccessSectionInput>({
    resolver: zodResolver(AccessSectionSchema),
  });

  const onSubmit = (data: AccessSectionInput) => {
    startTransition(async () => {
      try {
        const response = await sessionService.loginSection(
          data.name,
          data.accessCode,
        );

        return router.push(`/session/${response.id}`);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <LabelContainer label="Nome da sessão" htmlFor="name">
        <Input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Insira o nome da sessão"
          error={errors.name ? true : false}
          disabled={isPending}
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
          disabled={isPending}
        />
        {errors.accessCode && (
          <InputError message={errors.accessCode.message} />
        )}
      </LabelContainer>

      <Button
        text={isPending ? "Acessando..." : "Acessar sessão existente"}
        icon={!isPending && FaArrowRight}
        otherStyles="w-full"
      />
    </form>
  );
}
