import { z } from "zod";

export const tagSchema = z.object({
  uuid: z.string().uuid(
    {
      message: "O identificador deve ser um UUID válido",
    }
  ).optional(),
  name: z.string(
    {
      required_error: "O nome é obrigatório",
    }
  ).min(3, "O nome deve ter no mínimo 3 caracteres"),
  color: z.string(
    {
      required_error: "A cor é obrigatória",
    }
  ).min(3, "A cor deve ter no mínimo 3 caracteres"),
});

export type Tag = z.infer<typeof tagSchema>;