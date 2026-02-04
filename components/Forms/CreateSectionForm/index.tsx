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
import { createSessionAction } from "@/app/_actions/session";
import { useTransition } from "react";

export default function CreateSectionForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
  });

  const onSubmit = (data: CreateSessionInput) => {
    startTransition(async () => {
      const formData: FormData = new FormData();
      formData.append("name", data.name);
      const result = await createSessionAction(null, formData);

      if (result?.error) {
        setError("name", { type: "validate", message: result.error });
        console.log(result);
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
