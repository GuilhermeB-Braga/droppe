"use client";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LabelContainer from "@/components/LabelContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSessionSchema,
  CreateSessionInput,
} from "@/lib/validations/session";
import InputError from "@/components/InputError";
import { useTransition } from "react";

import SessionService from "@/services/SessionService";
import { useRouter } from "next/navigation";
const sessionService = new SessionService();

export default function CreateSectionForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
  });

  const onSubmit = (data: CreateSessionInput) => {
    startTransition(async () => {
      try {
        const result = await sessionService.createSection(data.name);

        return router.push(`/session/${result.id}`);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={isPending}
          />

          <Button
            text={isPending ? "Criando..." : "Nova Seção"}
            icon={!isPending && FiPlus}
            direction="left"
            disabled={isPending}
          />
        </div>
      </LabelContainer>

      {errors.name && <InputError message={errors.name.message} />}
    </form>
  );
}
