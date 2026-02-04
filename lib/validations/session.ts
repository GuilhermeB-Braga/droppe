import { z } from "zod";

export const CreateSessionSchema = z.object({
  name: z
    .string()
    .min(3, "O nome da sessão deve ter no minímo 3 caracteres")
    .max(25, "O nome da sessão deve ter no máximo 25 caracteres")
    .trim(),
});

export const AccessSectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome da sessão deve ter no minímo 3 caracteres")
    .max(25, "O nome da sessão deve ter no máximo 25 caracteres"),
    accessCode: z
        .string()
        .trim()
        .toUpperCase()
        .length(6, "O código deve ter exatamente 6 caracteres")
        .regex(/^[A-Z0-9]+$/, "O código deve conter apenas letras e números")
    
});

// Forms Types

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
export type AccessSectionInput = z.infer<typeof AccessSectionSchema>
