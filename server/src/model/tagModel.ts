import { z } from "zod";

export const tagSchema = z.object({
  uuid: z
    .string({
      message: "O uuid deve ser um texto válido",
      required_error: "O uuid é obrigatório",
      description: "O identificador único da tag",
    })
    .uuid({
      message: "O uuid deve ser um identificador único válido",
    })
    .optional(),
  name: z.string({
    message: "O nome deve ser um texto válido e não pode ser vazio",
    required_error: "O nome é obrigatório",
    description: "O nome da tag",
  }),
  color: z.string({
    message: "A cor deve ser um texto válido e não pode ser vazio",
    required_error: "A cor é obrigatória",
    description: "A cor da tag",
  }),
});

export type Tag = z.infer<typeof tagSchema>;